# from database.models import Data
# from flask import request , jsonify
# from app import app

# @app.route('/fetch', methods=['POST'])
# def process_input():
#     data = Data()
#     inputs = request.get_json(force=True)
#     output = data.fetch_user_data(inputs['_id'],inputs['username'])
#     return output