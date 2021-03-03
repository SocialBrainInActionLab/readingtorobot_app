
import csv
import os
import signal
import subprocess
import time
from typing import Optional
import socket

from flask import Flask, request, Response, make_response, jsonify
from flask_cors import CORS

import paho.mqtt.client as mqtt

DEFAULT_DATA_FILE = './data.csv'
app = Flask(__name__, static_url_path='')
CORS(app)

robotProcesses = []
running_robot = '_'


def stop_robot(name: str, timeout: Optional[int] = 15) -> bool:
    # First attemp to stop the robot cleanly.

    stop_robot.robot_closed = True
    stop_robot.speech_closed = True
    for p in robotProcesses:
        if name in p.args and p.poll() is None:
            stop_robot.robot_closed = False
        if 'speech' in p.args and p.poll() is None:
            stop_robot.speech_closed = False

    def robot_callback(cli, obj, msg):
        stop_robot.robot_closed = True

    def speech_callback(cli, obj, msg):
        stop_robot.speech_closed = True

    mqttc = mqtt.Client()
    mqttc.message_callback_add("{}/stopped_clean".format(name), robot_callback)
    mqttc.message_callback_add("speech/stopped_clean", speech_callback)
    mqttc.connect(socket.gethostbyname(socket.gethostname()))
    mqttc.subscribe("{}/stopped_clean".format(name), 0)
    mqttc.subscribe("speech/stopped_clean", 0)
    mqttc.loop_start()
    mqttc.publish("{}/stop".format(name), "stop")
    mqttc.publish("speech/stop", "stop")

    for _ in range(timeout):
        if stop_robot.robot_closed and stop_robot.speech_closed:
            return True
        time.sleep(1)
    return False


def stop_robot_process(p: subprocess.Popen) -> Response:
    print(p)
    p.terminate()
    # Make sure that the process is terminated. If time runs out, send sigkill and send back an error code.
    print('waiting')
    for _ in range(150):
        if p.poll() is not None:
            return make_response(jsonify({"message": "Robot stopped."}), 200)
        time.sleep(0.1)
    else:
        os.killpg(os.getpgid(p.pid), signal.SIGKILL)
        return make_response(
            jsonify({
                "message": "Robot killed, please ensure the robot has stopped, and restart it otherwise."
                }), 410)


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/startRobot', methods=['POST'])
def startRobot():
    robot_name = request.get_json()

    global robotProcesses
    global running_robot

    running_robot = robot_name.lower()

    robotProcesses.append(subprocess.Popen('speech_service.py'))
    if running_robot == 'cozmo':
        robotProcesses.append(subprocess.Popen('read_to_cozmo'))
    else:
        robotProcesses.append(subprocess.Popen('launch_{}.sh'.format(running_robot)))

    res = make_response(jsonify({"message": "OK"}), 200)
    return res


@app.route('/stopRobot', methods=['POST'])
def stopRobot():
    global robotProcesses
    global running_robot

    # First, try to stop the robot with mqtt command.
    if running_robot is not None and stop_robot(running_robot):
        robotProcesses = []
        return make_response(jsonify({"message": "Robot stopped."}), 200)

    # If the robot does not stop, close processes individually
    if robotProcesses:
        for p in robotProcesses:
            res = stop_robot_process(p)
            if res.status != 200:
                break
    else:
        res = make_response(jsonify({"message": "No robot processes are running"}), 500)

    robotProcesses = []

    return res


@app.route('/storeData', methods=['POST'])
def storeData():
    p_data = request.get_json()
    data_file = p_data.pop('dataFile', DEFAULT_DATA_FILE)

    if not os.path.isfile(data_file):
        # Create new file and add header.
        with open(data_file, 'w') as f:
            writer = csv.writer(f)
            header = p_data.keys()
            writer.writerow(header)
            writer.writerow(p_data.values())
    else:
        with open(data_file, 'a') as f:
            writer = csv.writer(f)
            writer.writerow(p_data.values())


@app.route('/getRobotState', methods=['GET'])
def getRobotState():
    return make_response(jsonify({'running': len(robotProcesses)}), 200)


@app.route('/getData', methods=['GET'])
def getData():
    msg = request.get_json()
    data_file = msg.get('dataFile', DEFAULT_DATA_FILE)
    if not os.path.isfile(data_file):
        return make_response(jsonify({"message": "No data file {} not found".format(data_file)}), 415)
    with open(data_file, 'r') as f:
        reader = csv.Dictreader(f)
        msg = [row for row in reader]
        return make_response(jsonify(msg), 200)

    return make_response(jsonify({"message": "Unable to open file: {}".format(data_file)}), 415)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
