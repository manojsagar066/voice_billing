from os import path
from flask import Flask, jsonify, request, session, redirect
import base64
import speech_recognition as sr
import soundfile as sf


class Processor:

    def encode_wav_file(self , file_path):
        # Pass the audio data to an encoding function.
        def encode_audio(audio):
            audio_content = audio.read()
            return base64.b64encode(audio_content)
        fin = open(file_path, "rb")
        encoded_string = encode_audio(fin)
        return encoded_string

    def decode_base64_string(self , encoded_string):
        wav_path = path.join(path.dirname(path.realpath(__file__)) ,'last.wav' )
        wav_file = open(wav_path, "wb")
        decode_string = base64.b64decode(encoded_string)
        print(wav_file.write(decode_string))
        return wav_path

    def covert_speech_to_text(self , wav_path):
        r = sr.Recognizer()
        with sr.WavFile(wav_path) as source:  # use "test.wav" as the audio source
            audio = r.record(source)  # extract audio data from the file
            try:
                text = r.recognize_google(audio, language='en-US')  # generate a list of possible transcription#
            except sr.UnknownValueError:
                return jsonify({'Error' : 'Voice not clear'})
            except r.RequestError:
                return jsonify({'error' : 'API not available'})
            return jsonify({'text' : text})



