
import csv
import os
import signal
import subprocess
import time
from typing import Optional

from flask import Flask, request, Response, make_response, jsonify
from flask_cors import CORS

import paho.mqtt.client as mqtt

DEFAULT_DATA_FILE = './data.csv'
app = Flask(__name__, static_url_path='')
CORS(app)

robotProcesses = []
running_robot = None

s_callback = None


def stop_robot(name: str, timeout: Optional[int] = 15) -> bool:
    # First attemp to stop the robot cleanly.
    stop_robot.robot_closed = False
    stop_robot.speech_closed = False

    def robot_callback():
        stop_robot.robot_closed = True

    def speech_callback():
        stop_robot.speech_closed = True

    mqttc = mqtt.Client()
    mqttc.message_callback_add("{}/stopped_clean".format(name), robot_callback)
    mqttc.message_callback_add("speech/stopped_clean", speech_callback)
    mqttc.connect('10.204.38.100')
    mqttc.subscribe("{}/stopped_clean".format(name), 0)
    mqttc.subscribe("speech/stopped_clean", 0)
    mqttc.loop_start()
    mqttc.publish("{}/stop".format(name), "stop")
    mqttc.publish("speech/stop", "stop")

    for _ in range(timeout * 10):
        if stop_robot.robot_closed and stop_robot.speech_closed:
            return True
        time.sleep(0.1)
    return False


def stop_robot_process(p: subprocess.Popen) -> Response:
    os.killpg(os.getpgid(p.pid), signal.SIGTERM)
    # Make sure that the process is terminated. If time runs out, send sigkill and send back an error code.
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

    running_robot = robot_name

    if robot_name.lower() == 'nao':
        robotProcesses.append(subprocess.Popen('speech_service.py'))
        robotProcesses.append(subprocess.Popen('launch_nao.sh'))
        pass
    elif robot_name.lower() == 'cozmo':
        robotProcesses.append(subprocess.Popen('speech_service.py'))
        robotProcesses.append(subprocess.Popen('read_to_cozmo'))
        pass
    elif robot_name.lower() == 'miro':
        robotProcesses.append(subprocess.Popen('speech_service.py'))
        robotProcesses.append(subprocess.Popen('launch_miro.sh'))
        pass

    res = make_response(jsonify({"message": "OK"}), 200)
    return res


@app.route('/stopRobot', methods=['GET'])
def stopRobot():
    global robotProcesses
    global running_robot

    # First, try to stop the robot with mqtt command.
    if running_robot is not None and stop_robot(running_robot):
        return make_response(jsonify({"message": "Robot stopped."}), 200)

    # If the robot does not stop, close processes individually
    if robotProcesses:
        for p in robotProcesses:
            res = stop_robot_process(p)
            if res != 200:
                return res
    else:
        res = make_response(jsonify({"message": "No robot processes are running"}), 500)

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
    app.run()
