"""Web server for the Reading To Robots App."""

import csv
import json
import os
import signal
import subprocess
import time

from flask import Flask, request, make_response, jsonify
from flask.wrappers import Response
from flask_cors import CORS

import paho.mqtt.client as mqtt

from slack_bot import publish_hostname


app = Flask(__name__, static_url_path="")
CORS(app)

robotProcesses = []
csv_fieldnames = [
    "id",
    "date",
    "AloneRobotPref_D",
    "AloneRobotPref_O",
    "RobotCanRead_O",
    "ExperimenterPresence_R",
    "miro_AnyQ",
    "miro_Intelligent",
    "miro_Friendly",
    "nao_AnyQ",
    "nao_Intelligent",
    "nao_Friendly",
    "cozmo_AnyQ",
    "cozmo_Intelligent",
    "cozmo_Friendly",
    "chosen",
    "Impressions",
    "Helpful_D",
    "Helpful_O",
    "Helpful_R",
    "GoodListener_R",
    "GoodTeacher_R",
    "Kind_R",
    "Dislike_O",
    "Dislike_D",
    "TeachRobotPref_O",
    "TeachRobotPref_D",
    "Enjoy_O",
    "Enjoy_D",
    "Enjoy_R",
    "GoodReadBudQuals_O",
    "BetterReadButQuals_Q",
    "Activities_O",
    "AvoidActivities_O",
    "FinalComments_O",
    "VideoOrder",
    "rating1_miro",
    "rating1_origin",
    "rating1_nao",
    "rating1_cozmo",
    "rating2_cozmo",
    "rating2_origin",
    "rating2_miro",
    "rating2_nao",
    "stai1_calm",
    "stai1_content",
    "stai1_relaxed",
    "stai1_tense",
    "stai1_upset",
    "stai1_worried",
    "stai2_calm",
    "stai2_content",
    "stai2_relaxed",
    "stai2_tense",
    "stai2_upset",
    "stai2_worried",
]
running_robot = "_"
robot_ips = {}
data_file = "/data/data.csv"


def stop_robot(name: str, timeout: int = 30) -> bool:
    """Stop the robot with name.

    :param name: Name of the robot.
    :param timeout: Time limit for stop call.
    :return: Success.
    """
    # First attemp to stop the robot cleanly.

    stop_robot.robot_closed = True
    stop_robot.speech_closed = True
    for p in robotProcesses:
        if name in p.args[0] and p.poll() is None:
            stop_robot.robot_closed = False
        if "speech" in p.args and p.poll() is None:
            stop_robot.speech_closed = False

    def robot_callback(cli, obj, msg):
        del cli, obj, msg
        stop_robot.robot_closed = True

    def speech_callback(cli, obj, msg):
        del cli, obj, msg
        stop_robot.speech_closed = True

    mqttc = mqtt.Client("stop")
    mqttc.message_callback_add("{}/stopped_clean".format(name), robot_callback)
    mqttc.message_callback_add("speech/stopped_clean", speech_callback)
    mqttc.connect("127.0.0.1")
    mqttc.subscribe("{}/stopped_clean".format(name), 0)
    mqttc.subscribe("speech/stopped_clean", 0)
    mqttc.loop_start()
    mqttc.publish("{}/stop".format(name), "stop")
    mqttc.publish("speech/stop", "stop")

    res = False
    for _ in range(timeout):
        if stop_robot.robot_closed and stop_robot.speech_closed:
            res = True
            break
        time.sleep(1)

    mqttc.loop_stop()
    mqttc.disconnect()

    return res


def stop_speech(timeout: int = 20) -> bool:
    """Stop speech recognition subprocess.

    :return: Success
    """
    stop_speech.speech_closed = True
    for p in robotProcesses:
        if "speech" in p.args and p.poll() is None:
            stop_speech.speech_closed = False

    def speech_callback(cli, obj, msg):
        del cli, obj, msg
        stop_speech.speech_closed = True

    mqttc = mqtt.Client("stopSpeech")
    mqttc.message_callback_add("speech/stopped_clean", speech_callback)
    mqttc.connect("127.0.0.1")
    mqttc.subscribe("speech/stopped_clean", 0)
    mqttc.loop_start()
    mqttc.publish("speech/stop", "stop")

    res = False
    for _ in range(timeout):
        if stop_speech.speech_closed:
            res = True
            break
        time.sleep(1)

    mqttc.loop_stop()
    mqttc.disconnect()

    return res


def stop_robot_process(p: subprocess.Popen) -> Response:
    """Force stop subprocess of the currently running robot.

    :param p: Process to stop.
    :return: Stop result.
    """
    print(p.args)
    p.terminate()
    # Make sure that the process is terminated. If time runs out, send sigkill and send back an error code.
    print("waiting")
    for _ in range(150):
        if p.poll() is not None:
            return make_response(jsonify({"message": "Robot stopped."}), 200)
        time.sleep(0.1)
    else:
        os.killpg(os.getpgid(p.pid), signal.SIGKILL)
        return make_response(
            jsonify(
                {
                    "message": "Robot killed, please ensure the robot has stopped, and restart it otherwise."
                }
            ),
            410,
        )


@app.route("/")
def home():
    """Root page."""
    return app.send_static_file("index.html")


@app.route("/setSettings", methods=["POST"])
def setSettings():
    """Update server settings."""
    settings = request.get_json() or {}
    global robot_ips, data_file

    for robot in settings["robotIPs"]:
        robot_ips[robot] = settings["robotIPs"][robot]
    data_file = os.path.join("/data", settings["filename"])

    return make_response(jsonify({"message": "OK"}), 200)


@app.route("/startRobot", methods=["POST"])
def startRobot():
    """Start a robot with name."""
    robot_name = request.get_json() or ""

    global robotProcesses
    global running_robot

    running_robot = robot_name.lower()

    if running_robot == "cozmo":
        robotProcesses.append(subprocess.Popen(["read_to_robot", "cozmo"]))
    else:
        robotProcesses.append(
            subprocess.Popen(
                ["launch_{}.sh".format(running_robot), robot_ips.get(running_robot, "")]
            )
        )

    startRobot.started_result = None
    res = None

    def start_callback(cli, obj, msg):
        del cli, obj
        startRobot.started_result = int(msg.payload.decode("ascii"))

    mqttc = mqtt.Client("start")
    mqttc.message_callback_add("{}/started".format(running_robot), start_callback)
    mqttc.connect("127.0.0.1")
    mqttc.subscribe("{}/started".format(running_robot), 0)
    mqttc.loop_start()

    for _ in range(15):
        time.sleep(1)
        if startRobot.started_result is not None:
            if startRobot.started_result:
                res = make_response(jsonify({"message": "OK"}), 200)
            else:
                res = make_response(jsonify({"message": "Failed to start!"}), 500)
            break
        if not any([True for p in robotProcesses if p.poll() is None]):
            res = make_response(jsonify({"message": "Failed to start robot!"}), 501)
            break
    else:
        res = make_response(
            jsonify({"message": "Failed to start robot, timeout!"}), 502
        )

    mqttc.loop_stop()
    mqttc.disconnect()

    return res


@app.route("/stopRobot", methods=["POST"])
def stopRobot():
    """Stop the running robot."""
    global robotProcesses
    global running_robot

    res = make_response(jsonify({"message": "No robot processes are running"}), 500)

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

    robotProcesses = []

    return res


@app.route("/startSpeech", methods=["GET"])
def startSpeech():
    """Start speech recognition process."""
    global robotProcesses

    robotProcesses.append(subprocess.Popen("speech_service.py"))

    # We should wait a bit to ensure all mqtt clients are connected before allowing to send the stop message.
    time.sleep(1)

    res = make_response(jsonify({"message": "OK"}), 200)
    return res


@app.route("/stopSpeech", methods=["GET"])
def stopSpeech():
    """Stop speech recognition process."""
    global robotProcesses
    global running_robot

    # First, try to stop the robot with mqtt command.
    if running_robot is not None and stop_speech():
        todel = []
        for i, p in enumerate(robotProcesses):
            if "speech" in p.args and p.poll() is None:
                todel.insert(0, i)
        for i in todel:
            del robotProcesses[i]
        return make_response(jsonify({"message": "Speech stopped."}), 200)

    # If the robot does not stop, close processes individually
    todel = []
    for i, p in enumerate(robotProcesses):
        if "speech" in p.args and p.poll() is None:
            res = stop_robot_process(p)
            todel.insert(0, i)
            break
    else:
        res = make_response(jsonify({"message": "Speech is not running."}), 200)

    for i in todel:
        del robotProcesses[i]

    return res


@app.route("/pubMQTT", methods=["POST"])
def pubMQTT():
    """Publish MQTT message."""
    req = request.get_json() or {}
    mqttc = mqtt.Client("publisher")

    mqttc.connect("127.0.0.1")
    mqttc.loop_start()
    mqttc.publish(req["topic"], req["msg"])
    mqttc.loop_stop()
    mqttc.disconnect()
    return make_response(jsonify({"message": "Message sent."}), 200)


@app.route("/saveData", methods=["POST"])
def saveData():
    """Write data in data file."""
    d = request.get_json() or {}
    if isinstance(d, str):
        d = json.loads(d)

    if not os.path.isfile(data_file):
        # Create new file and add header.
        with open(data_file, "w") as f:
            writer = csv.DictWriter(f, csv_fieldnames)
            writer.writeheader()
            writer.writerow(d)
    else:
        with open(data_file, "a") as f:
            writer = csv.DictWriter(f, csv_fieldnames)
            writer.writerow(d)

    return make_response(jsonify({"message": "Saved."}), 200)


@app.route("/getRobotState", methods=["GET"])
def getRobotState():
    """Check the status of the robot process."""
    return make_response(
        jsonify(
            {
                "running": any([True for p in robotProcesses if p.poll() is None]),
                "speech": any(
                    [
                        True
                        for p in robotProcesses
                        if "speech" in p.args and p.poll() is None
                    ]
                ),
            }
        ),
        200,
    )


@app.route("/getData", methods=["GET"])
def getData():
    """Return stored data (Currently unused)."""
    msg = request.get_json()
    if not os.path.isfile(data_file):
        return make_response(
            jsonify({"message": "No data file {} not found".format(data_file)}), 415
        )
    response = make_response(
        jsonify({"message": "Unable to open file: {}".format(data_file)}), 415
    )
    with open(data_file, "r") as f:
        reader = csv.DictReader(f)
        msg = [row for row in reader]
        response = make_response(jsonify(msg), 200)

    return response


if __name__ == "__main__":
    try:
        publish_hostname()
    except Exception as e:
        app.logger.warn(e)
    app.run(host="0.0.0.0")
