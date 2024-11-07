# database.py
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from typing import Optional, Dict
from bson import ObjectId
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None
    
    @classmethod
    async def connect_db(cls):
        try:
            mongodb_url = os.getenv("MONGODB_URL")
            if not mongodb_url:
                raise Exception("MONGODB_URL not found in environment variables")
            
            cls.client = AsyncIOMotorClient(
                mongodb_url,
                server_api=ServerApi('1')
            )
            
            await cls.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
            
            cls.db = cls.client.profile_blog
            
            # Create indexes
            await cls.db.users.create_index("primary_account")
            await cls.db.users.create_index([("connected_accounts.google.id", 1)])
            await cls.db.users.create_index([("connected_accounts.line.id", 1)])
            
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise e
    
    @classmethod
    def _serialize_doc(cls, doc: Optional[Dict]) -> Optional[Dict]:
        if doc is None:
            return None
        doc['id'] = str(doc.pop('_id'))  # Convert _id to id
        return doc
    
    @classmethod
    async def close_db(cls):
        if cls.client:
            cls.client.close()
    
    @classmethod
    async def get_user_by_social_id(cls, provider: str, social_id: str) -> Optional[Dict]:
        if not cls.client:
            raise Exception("Database not connected")
            
        query = {f"connected_accounts.{provider}.id": social_id}
        try:
            user = await cls.db.users.find_one(query)
            return cls._serialize_doc(user)
        except Exception as e:
            print(f"Error finding user: {e}")
            raise e
    
    @classmethod
    async def create_user(cls, user_data: Dict) -> Dict:
        if not cls.client:
            raise Exception("Database not connected")
            
        try:
            result = await cls.db.users.insert_one(user_data)
            created_user = await cls.db.users.find_one({"_id": result.inserted_id})
            return cls._serialize_doc(created_user)
        except Exception as e:
            print(f"Error creating user: {e}")
            raise e
    
    @classmethod
    async def update_user(cls, social_id: str, provider: str, update_data: Dict) -> Optional[Dict]:
        if not cls.client:
            raise Exception("Database not connected")
            
        query = {f"connected_accounts.{provider}.id": social_id}
        update = {"$set": {
            "last_login": update_data["last_login"],
            f"connected_accounts.{provider}": update_data["connected_accounts"][provider]
        }}
        
        try:
            result = await cls.db.users.find_one_and_update(
                query,
                update,
                return_document=True
            )
            return cls._serialize_doc(result)
        except Exception as e:
            print(f"Error updating user: {e}")
            raise e
        
    @classmethod
    async def delete_user(cls, user_id: str) -> bool:
        if not cls.client:
            raise Exception("Database not connected")
            
        try:
            result = await cls.db.users.delete_one({"_id": ObjectId(user_id)})
            return result.deleted_count > 0
        except Exception as e:
            print(f"Error deleting user: {e}")
            raise e