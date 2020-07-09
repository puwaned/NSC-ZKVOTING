from flask import request
from flask import Flask
from flask import jsonify
from flask_cors import CORS
import subprocess
import json
import re
import sys
import signal
import docker
import os

cfg = {"app_location": os.getcwd()}

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return jsonify({"success": "true", "data": "test"})


@app.route("/getfinger", methods=["GET"])
def get_finger():
    try:
        subprocess.call(
            "cd "
            + cfg["app_location"]
            + "/client/client/bin/Debug/ && client.exe get_finger",
            shell=True,
        )
        with open(
            cfg["app_location"] + "/client/client/bin/Debug/current_finger.txt"
        ) as f:
            data = f.read()
        return jsonify({"success": True, "data": data})
    except:
        return jsonify({"success": False, "message": "something went wrong!"})


@app.route("/verifyfinger", methods=["POST"])
def verify_finger():
    data = json.loads(request.data)
    current_finger = data["current_finger"]
    list_finger = data["list_finger"]
    try:
        subprocess.call(
            "cd "
            + cfg["app_location"]
            + "/client/client/bin/Debug/ && client.exe verify_finger "
            + current_finger
            + " "
            + list_finger,
            shell=True,
        )
        with open(cfg["app_location"] + "/client/client/bin/Debug/result.txt") as f:
            data = f.read()
            if data == "false":
                return jsonify({"success": False})
            else:
                return jsonify({"success": True, "data": data})
    except:
        return jsonify({"success": False})


if __name__ == "__main__":
    app.run(debug=True)

