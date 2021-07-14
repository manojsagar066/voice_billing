from flask import Flask
import pymongo
from pymongo import MongoClient
import bson
from bson.json_util import dumps


client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
collection = db["items"]



app = Flask(__name__)


@app.route('/',methods=["GET"])
def get_items():
    items = collection.find({})
    return dumps(items)

if __name__ == "__main__":
    app.run(debug=True)