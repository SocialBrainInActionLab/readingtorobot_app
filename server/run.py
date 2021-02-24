from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__, static_url_path='')
CORS(app)


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/startRobot', methods=['POST'])
def startRobot():
    print(request.get_json())
    res = make_response(jsonify({"message": "OK"}), 200)
    return res


if __name__ == '__main__':
    app.run()
