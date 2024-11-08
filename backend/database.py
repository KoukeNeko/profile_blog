# database.py
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from typing import Optional, Dict
from bson import ObjectId
import os
from dotenv import load_dotenv
import certifi
import ssl
import urllib.parse

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

            # Parse and update the connection string
            url_parts = list(urllib.parse.urlparse(mongodb_url))
            query = dict(urllib.parse.parse_qsl(url_parts[4]))
            query.update({
                'retryWrites': 'true',
                'w': 'majority'
            })
            url_parts[4] = urllib.parse.urlencode(query)
            mongodb_url = urllib.parse.urlunparse(url_parts)

            print("Attempting to connect to MongoDB...")
            print(f"Using certifi path: {certifi.where()}")
            print(f"SSL version: {ssl.OPENSSL_VERSION}")
            
            # Initialize client with minimal SSL configuration
            cls.client = AsyncIOMotorClient(
                mongodb_url,
                server_api=ServerApi('1'),
                tls=True,
                tlsCAFile=certifi.where(),
                connectTimeoutMS=30000,
                socketTimeoutMS=30000,
                serverSelectionTimeoutMS=30000,
                maxPoolSize=10
            )
            
            # Test the connection
            await cls.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
            
            cls.db = cls.client.profile_blog
            
            # Create indexes with error handling
            try:
                await cls.db.users.create_index("primary_account")
                await cls.db.users.create_index([("connected_accounts.google.id", 1)])
                await cls.db.users.create_index([("connected_accounts.line.id", 1)])
                print("Successfully created database indexes")
            except Exception as index_error:
                print(f"Warning: Error creating indexes: {index_error}")
            
        except Exception as e:
            error_msg = str(e)
            print(f"Error connecting to MongoDB: {error_msg}")
            print("\nTroubleshooting Steps:")
            print("1. Verify MongoDB Atlas Network Access settings")
            print("2. Check if MongoDB user has correct privileges")
            print("3. Ensure MongoDB connection string is properly formatted")
            print("4. Verify SSL/TLS certificates are properly installed")
            raise Exception(f"Failed to establish database connection: {error_msg}")
    
    @classmethod
    def _serialize_doc(cls, doc: Optional[Dict]) -> Optional[Dict]:
        if doc is None:
            return None
        doc['id'] = str(doc.pop('_id'))
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