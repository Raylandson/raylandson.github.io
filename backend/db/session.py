from pymongo import MongoClient

# Replace <db_password> with the actual password for your admin user
MONGO_URI = "mongodb+srv://admin:@travels.3dckthr.mongodb.net/?retryWrites=true&w=majority"

# You can specify your database name here if you already know it
MONGO_DB = "travels"

# Create the MongoClient and specify the database
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

def get_db():
    return db
