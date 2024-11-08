# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Union, Literal
from database import Database
import jwt
from datetime import datetime
import uuid
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from datetime import datetime, timezone

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://log.doeshing.ink","https://blog.doeshing.ink"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class LineAuthRequest(BaseModel):
    userId: str
    displayName: str
    pictureUrl: Optional[str] = ''
    statusMessage: Optional[str] = ''
    access_token: str

class GoogleAuthRequest(BaseModel):
    credential: str
    clientId: str

class SocialAccountBase(BaseModel):
    id: str
    name: str
    picture: Optional[str]
    access_token: str
    
class GoogleAccount(SocialAccountBase):
    email: str

class LineAccount(SocialAccountBase):
    status_message: Optional[str] = ''

class User(BaseModel):
    name: str
    picture: Optional[str]
    email: Optional[str] = ''  # Optional for LINE users
    primary_account: Literal["Google", "LINE"]
    connected_accounts: Dict[str, Union[GoogleAccount, LineAccount]]
    last_login: str
    created_at: str

# Database connection events
@app.on_event("startup")
async def startup_db_client():
    try:
        await Database.connect_db()
        print("Database connection established")
    except Exception as e:
        print(f"Failed to establish database connection: {e}")
        # You might want to exit the application here if DB connection is critical
        # import sys
        # sys.exit(1)

@app.on_event("shutdown")
async def shutdown_db_client():
    await Database.close_db()
    print("Database connection closed")

# Endpoints
@app.post("/api/auth/social/line")
async def line_auth(request: LineAuthRequest):
    try:
        if not Database.client:
            await Database.connect_db()
            
        social_id = request.userId
        existing_user = await Database.get_user_by_social_id("line", social_id)
        
        line_account = LineAccount(
            id=social_id,
            name=request.displayName,
            picture=request.pictureUrl,
            status_message=request.statusMessage,
            access_token=request.access_token
        )
        
        if existing_user:
            # Update existing user
            updated_user = await Database.update_user(
                social_id=social_id,
                provider="line",
                update_data={
                    "last_login": datetime.now(timezone.utc),
                    "connected_accounts": {
                        "line": line_account.dict()
                    }
                }
            )
            return {"user": updated_user, "is_new": False}
            
        else:
            # Create new user
            new_user = {
                "name": request.displayName,
                "picture": request.pictureUrl,
                "email": "",  # LINE doesn't provide email
                "primary_account": "LINE",
                "connected_accounts": {
                    "line": line_account.dict()
                },
                "last_login": datetime.now(timezone.utc),
                "created_at": datetime.now(timezone.utc)
            }
            
            created_user = await Database.create_user(new_user)
            return {"user": created_user, "is_new": True}
            
    except Exception as e:
        print(f"Error in line_auth: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/auth/social/google")
async def google_auth(request: GoogleAuthRequest):
    try:
        if not Database.client:
            await Database.connect_db()
            
        decoded = jwt.decode(
            request.credential,
            options={"verify_signature": False}
        )
        
        social_id = decoded["sub"]
        name = decoded.get("name", "")
        picture = decoded.get("picture", "")
        email = decoded.get("email", "")
        
        existing_user = await Database.get_user_by_social_id("google", social_id)
        
        google_account = GoogleAccount(
            id=social_id,
            name=name,
            picture=picture,
            email=email,
            access_token=request.credential
        )
        
        if existing_user:
            # Update existing user
            updated_user = await Database.update_user(
                social_id=social_id,
                provider="google",
                update_data={
                    "last_login": datetime.now(timezone.utc),
                    "connected_accounts": {
                        "google": google_account.dict()
                    }
                }
            )
            return {"user": updated_user, "is_new": False}
            
        else:
            # Create new user
            new_user = {
                "name": name,
                "picture": picture,
                "email": email,
                "primary_account": "Google",
                "connected_accounts": {
                    "google": google_account.dict()
                },
                "last_login": datetime.now(timezone.utc),
                "created_at": datetime.now(timezone.utc)
            }
            
            created_user = await Database.create_user(new_user)
            return {"user": created_user, "is_new": True}
            
    except Exception as e:
        print(f"Error in google_auth: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: str):
    try:
        if not Database.client:
            await Database.connect_db()
            
        success = await Database.delete_user(user_id)
        if success:
            return {"message": "用戶已成功刪除"}
        else:
            raise HTTPException(status_code=404, detail="找不到指定用戶")
            
    except Exception as e:
        print(f"Error in delete_user: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
        
# Health check endpoint
@app.get("/health")
async def health_check():
    try:
        if not Database.client:
            await Database.connect_db()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}