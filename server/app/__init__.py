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

from audio_processing.routes import *

