from app import app
from flask import jsonify , request


@app.errorhandler(404)
def handle():
    return "Error ide Macha"

@app.route("/" , methods=['GET', 'POST'])
def home():
    return jsonify({'res':request.args.get('string')})