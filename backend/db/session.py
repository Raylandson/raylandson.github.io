from pymongo import MongoClient

# Replace <db_password> with the actual password for your admin user
MONGO_URI = "mongodb+srv://admin:q4n6K0W3MeYFl4xn@travels.3dckthr.mongodb.net/?retryWrites=true&w=majority&appName=travels"
#mongodb+srv://admin:q4n6K0W3MeYFl4xn@travels.3dckthr.mongodb.net/?retryWrites=true&w=majority&appName=travels
# You can specify your database name here if you already know it
MONGO_DB = "travels"

# Create the MongoClient and specify the database
try:
    print('salobraro pegando o server')
    client = MongoClient(MONGO_URI,
                        connecttimeoutms=30000,
                     serverselectiontimeoutms=30000)
    db = client[MONGO_DB]

except Exception as error:
    print(error)

def get_db():
    print(db)
    return db
