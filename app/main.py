from flask import Flask, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect
import os

import random

app = Flask(__name__)

with open('../.env', 'r') as data:
    line = data.readline()
    SECRET_KEY = line.split('\"')[1]
    app.config['SECRET_KEY'] = SECRET_KEY

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

db = SQLAlchemy(app)

UPLOAD_FOLDER = './static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config["SECURITY_CSRF_COOKIE_NAME"] = "XSRF-TOKEN"
app.config["WTF_CSRF_TIME_LIMIT"] = None
app.config["SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS"] = True
CSRFProtect(app)

app.jinja_env.globals.update(randint=random.randrange)

from routes import *

if __name__ == '__main__':
    # Might add ssl_context=("cert.pem", "key.pem") on server
    app.run(host = "0.0.0.0", port = 8080, debug=True) 