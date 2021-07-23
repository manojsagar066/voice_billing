from flask import Flask
from flask import request, jsonify
import pymongo
from pymongo import MongoClient
import bson
from bson.json_util import dumps
from bson import json_util
import json

app = Flask(__name__)

client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
collection = db["system_users"]
bills = db["billsDemo"]
item_collection = db["items_description"]


@app.route("/")
def home():
    return "This is home macha"


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
        find = collection.find({"_id":id, "username":username})
        find_list = list(find)
        find_list.append([])
        data_json = dumps(find_list)
        return data_json
    
    else:
        data = bills.find({"userId":id})
        data_list.append(data)
        data_json = dumps(data_list)
        return data_json

@app.route("/addbill",methods=['POST'])
def add_bill():
    inputs = request.get_json(force=True)
    customer = inputs["customer"]
    total = inputs["total"]
    items = inputs["items"]
    userId = inputs["userId"]
    bills.insert_one({"customer":customer,"total":total,"items":items,"userId":userId})
    response = bills.find({"customer":customer,"total":total,"items":items,"userId":userId})
    response_list = list(response)
    response_json = dumps(response_list)
    return response_json

@app.route("/bill", methods=['POST'])
def fetch_bill():
    inputs = request.get_json(force=True)
    test = inputs["test"]
    collection = item_collection.find()
    col_list = list(collection)
    col_json = dumps(col_list)
    print(col_json)
    return "continue nithin"

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

