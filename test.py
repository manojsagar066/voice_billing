import pymongo
from pymongo import MongoClient

client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
collection = db["items"]

results = collection.find({"name":"oil"})
for result in results:
    print(result)