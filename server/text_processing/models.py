import nltk
from nltk.corpus import stopwords
from nltk import word_tokenize
import string
from flask import jsonify
import re
from pymongo import MongoClient
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
nltk.download('punkt')

client = MongoClient("mongodb+srv://RFIDpayments:Ff6RfZyRN5arkgvz@payments-ukurt.mongodb.net/test?retryWrites=true&w=majority")
db = client["voice_bill"]
item_collection = db["items_description"]


class Text_processor:

    def __init__(self):
        self.quantity = None
        self.units = None
        self.bill_tokens = None
        self.pos_tags = None

    def clean_string_tokens(self , input_string):
        stop = set(stopwords.words('english') + list(string.punctuation))
        self.bill_tokens = [i for i in word_tokenize(input_string.lower()) if i not in stop]

    def item_segmentation(self):
        pos_tag_string = nltk.pos_tag(self.bill_tokens)
        count = 0
        bill_string = []
        each_string = []
        while True:
            each_string.append(self.bill_tokens[count])
            count += 1
            if count < len(self.bill_tokens):
                if pos_tag_string[count][1] == 'CD':
                    bill_string.append(each_string)
                    each_string = []
            else:
                break

        bill_string.append(each_string)
        self.bill_tokens = bill_string
        return bill_string


class Bill_calculator:

    def __init__(self , bill_token):
        self.tokens = bill_token
        self.quantity = None
        self.units = None
        self.string = None
        self.items = None
        # self.textscore = ""

    def fetch_item(self):
        tokens = self.tokens[1: len(self.tokens)]
        self.string = ' '.join(map(str, tokens))
        # collection = item_collection.find(
        #     { "$text": { "$search": self.string}},
        # {"score": { "$meta": self.textscore}}
        # )
        collection = item_collection.find({
            "$text": {
                "$search": self.string
            },
        })
        col_list = list(collection)
        self.items = col_list

    def get_quantity_unit(self):

        pos = nltk.pos_tag(self.tokens)
        selective_pos = ['CD']
        selective_pos_words = []
        for word, tag in pos:
            if tag in selective_pos:
                selective_pos_words.append((word))

        if selective_pos_words[0].isnumeric() == False:
            temp = re.compile("([0-9]+)([a-zA-Z]+)")
            res = temp.match(selective_pos_words[0]).groups()
            self.quantity = res[0]
            if res[1][0] == 'k':
                self.units = 'kg'

            elif res[1][0] == 'm':
                self.units = 'ml'

            elif res[1][0] == 'g':
                self.units = 'gram'

            elif res[1][0] == 'l':
                self.units = 'litre'

            else :
                self.units = 'packet'

        else :
            index = self.tokens.index(selective_pos_words[0])
            self.quantity= self.tokens[index]
            units = self.tokens[index + 1]
            if units[0] == 'k':
                self.units = 'kg'

            elif units[0] == 'm':
                self.units = 'ml'

            elif units[0] == 'g':
                self.units = 'gram'

            elif units[0] == 'l':
                self.units = 'litre'

            else :
                self.units = 'packet'

        return

    def calculate_bill(self):

        if self.units == 'gram':
            self.quantity = float(self.quantity) / 1000
            self.units = 'kg'

        elif self.units == 'ml':
            self.quantity = float(self.quantity) / 1000
            self.units = 'litre'

        if self.units != self.items[0]['unit']:
            return "Items don't appear to be in the store"

        price =(float(self.quantity) * float(self.items[0]['price']))/   float(self.items[0]['quantity'])
        return {
            "Item Name" :self.items[0]['name'],
            "Quantity" : self.quantity,
            "Units" : self.items[0]['unit'],
            "Price ₹" : round(price, 2)

        }



