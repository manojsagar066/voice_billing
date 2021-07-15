from audio_processing.models import Processor
from flask import request , jsonify
from app import app


@app.route('/additem', methods=['POST'])
def process_input():
    processor = Processor()
    data = request.get_json(force=True)
    path = processor.decode_base64_string(data['string'])
    text = processor.covert_speech_to_text(path)
    return text


