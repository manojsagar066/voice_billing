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
item_collection = db["items"]


@app.route("/fetch", methods=["POST"])
def fetch_user_data():
    inputs = request.get_json(force=True)
    id = inputs["_id"]
    username = inputs["username"]
    data = collection.find({"_id":id, "username":username})
    data_list = list(data)
    data_json = dumps(data_list)
    if data_list == []:
        collection.insert_one({"_id":id, "username":username,"bills":[]})
        data = collection.find({"_id":id,"username":username})
        data_list = list(data)
        data_json = dumps(data_list)
        return data_json
    else:
        return data_json

@app.route("/add", methods=["POST"])
def add_item():
    inputs = request.get_json(force=True)
    name=inputs["name"]
    company = inputs["company"]
    price = inputs["price"]
    data = item_collection.find({"name":name})
    data_list = list(data)
    dic = dict(data_list[0])
    #check whether item exists
    n = len(dic['company'])
    for i in range(n):
        if company == dic['company'][i]['c_name']:
            return "item already exist"

    #add new item
    dic['company'].append({'c_name':company,'price':float(price),'quantity':1.0})
    item_collection.replace_one({"name":name},dic)
    return "new item added"



from app import routes

from audio_processing import routes






