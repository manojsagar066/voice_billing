from audio_processing.models import Processor
from flask import request , jsonify
from app import app
from text_processing.models import Bill_calculator , Text_processor

count = 0
print('checking count {}'.format(count))
count += 1

@app.route('/additem' , methods=['POST'])
def process_input():
    processor = Processor()
    data = request.get_json(force=True)
    path = processor.decode_base64_string(data['string'])
    text = processor.covert_speech_to_text(path)
    text_processor = Text_processor()
    text_processor.clean_string_tokens(text)
    cleaned_tokens = text_processor.item_segmentation()

    if len(cleaned_tokens) > 1:
        res = []
        for token in cleaned_tokens:
            calculator = Bill_calculator(token)
            try:
                calculator.get_quantity_unit()
            except IndexError:
                return jsonify({'Error' : "Utterance not in order" })
            calculator.fetch_item()
            try:
                res.append(calculator.calculate_bill())
            except IndexError:
                return jsonify({'Error':"Item not in the list"})

        return jsonify({'res' : res})
    else :
        calculator = Bill_calculator(cleaned_tokens[0])
        try:
            calculator.get_quantity_unit()
        except IndexError:
            return jsonify({'Error': "Utterance not in order"})
        calculator.fetch_item()
        try:
            return jsonify({'res':[calculator.calculate_bill()]})
        except IndexError:
            return jsonify({'Error': "Item not in the list"})
