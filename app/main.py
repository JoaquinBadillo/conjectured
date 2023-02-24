from flask import Flask, url_for
from flask_sqlalchemy import SQLAlchemy

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

ALLOWED_EXTENSIONS = {'md', 'png', 'jpg', 'jpeg'}

app.jinja_env.globals.update(randint=random.randrange)

from routes import *

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 8080, debug=True)