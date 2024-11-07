# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from database import Database
import jwt
from datetime import datetime
import uuid
from fastapi.encoders import jsonable_encoder
from bson import ObjectId

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LineAuthRequest(BaseModel):
    userId: str
    displayName: str
    pictureUrl: Optional[str] = ''
    statusMessage: Optional[str] = ''
    access_token: str

class GoogleAuthRequest(BaseModel):
    credential: str
    clientId: str

class SocialAccount(BaseModel):
    id: str
    provider: str
    name: str
    picture: Optional[str]
    email: Optional[str]
    status_message: Optional[str] = None
    access_token: str

@app.on_event("startup")
async def startup_db_client():
    await Database.connect_db()

@app.on_event("shutdown")
async def shutdown_db_client():
    await Database.close_db()
@app.post("/api/auth/social/line")
async def line_auth(request: LineAuthRequest):
    try:
        social_id = request.userId
        existing_user = await Database.get_user_by_social_id("line", social_id)
        
        if existing_user:
            # Update existing user's LINE account info
            line_account = {
                "id": social_id,
                "provider": "line",
                "name": request.displayName,
                "picture": request.pictureUrl,
                "email": request.email,
                "status_message": request.statusMessage,
                "access_token": request.access_token
            }
            
            update_data = {
                "last_login": datetime.utcnow().isoformat(),
                "connected_accounts": {
                    "line": line_account
                }
            }
            
            updated_user = await Database.update_user(social_id, "line", update_data)
            return {"user": updated_user, "is_new": False}
            
        else:
            # Create new user with LINE as primary account
            new_user = {
                "id": f"line_{social_id}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}",
                "primary_account": {
                    "id": social_id,
                    "provider": "line",
                    "name": request.displayName,
                    "picture": request.pictureUrl,
                    "email": request.email,
                    "status_message": request.statusMessage,
                    "access_token": request.access_token
                },
                "connected_accounts": {
                    "line": {
                        "id": social_id,
                        "provider": "line",
                        "name": request.displayName,
                        "picture": request.pictureUrl,
                        "email": request.email,
                        "status_message": request.statusMessage,
                        "access_token": request.access_token
                    }
                },
                "last_login": datetime.utcnow().isoformat(),
                "created_at": datetime.utcnow().isoformat()
            }
            
            created_user = await Database.create_user(new_user)
            return {"user": created_user, "is_new": True}
            
    except Exception as e:
        print(f"Error in line_auth: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/auth/social/google")
async def google_auth(request: GoogleAuthRequest):
    try:
        decoded = jwt.decode(
            request.credential,
            options={"verify_signature": False}
        )
        
        social_id = decoded["sub"]
        existing_user = await Database.get_user_by_social_id("google", social_id)
        
        if existing_user:
            google_account = {
                "id": social_id,
                "provider": "google",
                "name": decoded.get("name", ""),
                "picture": decoded.get("picture", ""),
                "email": decoded.get("email", ""),
                "access_token": request.credential
            }
            
            update_data = {
                "last_login": datetime.utcnow().isoformat(),
                "connected_accounts": {
                    "google": google_account
                }
            }
            
            updated_user = await Database.update_user(social_id, "google", update_data)
            return {"user": updated_user, "is_new": False}
            
        else:
            new_user = {
                "id": f"google_{social_id}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{str(uuid.uuid4())[:8]}",
                "primary_account": {
                    "id": social_id,
                    "provider": "google",
                    "name": decoded.get("name", ""),
                    "picture": decoded.get("picture", ""),
                    "email": decoded.get("email", ""),
                    "access_token": request.credential
                },
                "connected_accounts": {
                    "google": {
                        "id": social_id,
                        "provider": "google",
                        "name": decoded.get("name", ""),
                        "picture": decoded.get("picture", ""),
                        "email": decoded.get("email", ""),
                        "access_token": request.credential
                    }
                },
                "last_login": datetime.utcnow().isoformat(),
                "created_at": datetime.utcnow().isoformat()
            }
            
            created_user = await Database.create_user(new_user)
            return {"user": created_user, "is_new": True}
            
    except Exception as e:
        print(f"Error in google_auth: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
        