from flask import Flask
from pymongo import MongoClient
from bson.json_util import dumps
from datetime import datetime
app = Flask(__name__)

client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
collection = db["system_users"]
bills = db["billsDemo"]
item_collection = db["items_description"]


@app.route("/")
def home():
    return "His is home macha"

@app.route("/addbill",methods=['POST'])
def add_bill():
    inputs = request.get_json(force=True)
    customer = inputs["customer"]
    total = inputs["total"]
    items = inputs["items"]
    userId = inputs["userId"]
    bills.insert_one({"customer":customer,"total":total,"items":items,"userId":userId})
    return {"response":"bill added successfully"}


@app.route("/fetch", methods=["POST"])
def fetch_user_data():
    inputs = request.get_json(force=True)
    id = inputs["_id"]
    username = inputs["username"]
    data = collection.find({"_id":id, "username":username})
    data_list = list(data)
    data_json = dumps(data_list)
    if data_list == []:
        collection.insert_one({"_id":id, "username":username})
        return {"_id":id, "username":username, "bills":[]}
        #data = collection.find({"_id":id,"username":username})
        #data_list = list(data)
        #data_json = dumps(data_list)
        #return data_json
    
    else:
        data = bills.find({"userId":id})
        data_list = list(data)
        data_list.append({"username":username})
        data_json = dumps(data_list)
        return data_json


@app.route("/bill", methods=['POST'])
def fetch_bill():
    inputs = request.get_json(force=True)
    test = inputs["test"]
    collection = item_collection.find()
    col_list = list(collection)
    col_json = dumps(col_list)
    print(col_json)
    return "macha function bari"

@app.route("/add", methods=["POST"])
def add_item():
    inputs = request.get_json(force=True)
    name=inputs["name"]
    quantity = inputs["quantity"]
    unit = inputs["unit"]
    price = inputs["price"]
    data = item_collection.insert({"name":name,"quantity":quantity,"unit":unit,"price":price,"frequency":0})
    return {"response":"new item added"}

from audio_processing.routes import *

