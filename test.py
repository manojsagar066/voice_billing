import pymongo
from pymongo import MongoClient
import bson
from bson.json_util import dumps
from bson import json_util
import json

client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
collection = db["items_description"]
doc = {"name":"cashew nut","quantity":1,"unit":"kg","price":1270,"frequency":0}
results = collection.find()
res = list(results)
res_json = dumps(res)
print(res_json)