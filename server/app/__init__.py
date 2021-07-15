from flask import Flask
from flask import request, jsonify
import pymongo
from pymongo import MongoClient
import bson
from bson.json_util import dumps

app = Flask(__name__)

client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
collection = db["items"]



from app import routes

from audio_processing import routes







