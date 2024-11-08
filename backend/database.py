# database.py
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from typing import Optional, Dict
from bson import ObjectId
import os
from dotenv import load_dotenv
import certifi

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
            
            # Add SSL configuration and use certifi for certificate verification
            cls.client = AsyncIOMotorClient(
                mongodb_url,
                server_api=ServerApi('1'),
                tlsCAFile=certifi.where(),  # Add this line
                connectTimeoutMS=30000,      # Increase timeout
                socketTimeoutMS=30000,       # Increase timeout
                serverSelectionTimeoutMS=30000  # Increase server selection timeout
            )
            
            # Test the connection with a timeout
            await cls.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
            
            cls.db = cls.client.profile_blog
            
            # Create indexes with error handling
            try:
                await cls.db.users.create_index("primary_account")
                await cls.db.users.create_index([("connected_accounts.google.id", 1)])
                await cls.db.users.create_index([("connected_accounts.line.id", 1)])
            except Exception as index_error:
                print(f"Warning: Error creating indexes: {index_error}")
                # Continue execution even if index creation fails
            
        except Exception as e:
            print(f"Error connecting to MongoDB: {str(e)}")
            # Add more detailed error information
            if "SSL" in str(e):
                print("SSL Error Details:")
                print(f"Certifi path being used: {certifi.where()}")
                print("Please ensure your MongoDB connection string includes ssl=true and that your environment supports TLS/SSL")
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
            try:
                cls.client.close()
                print("Database connection closed successfully")
            except Exception as e:
                print(f"Error closing database connection: {e}")
    
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