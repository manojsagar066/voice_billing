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
        data_list1 = list(data)
        data = []
        for i in range(len(data_list1)):
            data.append({"customer":data_list1[i]['customer'], "total":data_list1[i]['total'],"items":data_list1[i]['items']})
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
    return {"response":"bill added successfully"}

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



    # inputs = request.get_json(force=True)
    # name=inputs["name"]
    # company = inputs["company"]
    # price = inputs["price"]
    # units = inputs["units"]
    # data = item_collection.find_one({"name":name})
    
    # #if prduct found
    # if data_list != []:
    #     dic = dict(data_list[0])
    #     #if company not specified
    #     if company == "":
    #         dic["price"]=price
    #         dic["units"]=units
    #         print(dic)
    #         item_collection.replace_one({"name":name}, dic)
    #         return {"response":"item added"}

    #     #if product already exists
    #     n = len(dic['company'])
    #     for i in range(n):
    #         if company == dic['company'][i]['c_name']:
    #             return {"response":"item already exist"}

    #     #adding new item
    #     dic['company'].append({'c_name':company,'price':float(price),'quantity':1.0})
    #     item_collection.replace_one({"name":name},dic)
    #     return {"response":"item added"}
    # #ading new product
    # else:
    #     #if company not specified
    #     if company=="":
    #         item_collection.insert({"name":name, "company":[],"price":price,"units":units})
    #         return {"response":"new item added"}

    #     else:
    #         item_collection.insert({"name":name, "company":[{"c_name":company,"price":price,"quantity":1.0}]})
    #         return {"response":"new item with new company added"}


from app import routes

from audio_processing import routes