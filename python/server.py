# coding: utf-8
import bottle
import dialogflow
import uuid
import json
from pydub import AudioSegment

import yargy_parsing as yp

PROJECT_ID = 'hack2018-224117'

SERVER_ADDRESS = '0.0.0.0'
SERVER_PORT = 8099


def recognize_audio(session_id, data_stream):
    with open('file.wav', 'wb') as f:
        f.write(data_stream.read())

    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(PROJECT_ID, session_id)

    wav_data = AudioSegment.from_wav('file.wav')
    wav_data = wav_data.set_channels(1)
    wav_data.export("file1.wav", format="wav")

    audio_encoding = dialogflow.enums.AudioEncoding.AUDIO_ENCODING_LINEAR_16
    sample_rate_hertz = 44100

    audio_config = dialogflow.types.InputAudioConfig(
        audio_encoding=audio_encoding, language_code='ru',
        sample_rate_hertz=sample_rate_hertz)
    query_input = dialogflow.types.QueryInput(audio_config=audio_config)

    response = session_client.detect_intent(
        session=session, query_input=query_input,
        input_audio=open('file1.wav', 'rb').read())

    response_text = response.query_result.query_text

    print(response_text)

    return response_text


@bottle.post('/api/voice')
def receive_voice():
    current_session = uuid.uuid4()
    response = recognize_audio(current_session, bottle.request.files['file'].file)
    structured = yp.parse(response)
    return json.dumps(structured, ensure_ascii=False)


@bottle.hook('after_request')
def modify_headers():
    bottle.response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    if bottle.request.environ['PATH_INFO'].startswith('/api/'):
        bottle.response.headers['Content-Type'] = 'application/json; charset=UTF-8'


# ======================================================
if __name__ == '__main__':
    bottle.run(host=SERVER_ADDRESS, port=SERVER_PORT)
