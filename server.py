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

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return jsonify({'success': 'true', 'data': 'test'})


if __name__ == '__main__':
    app.run(debug=True)
