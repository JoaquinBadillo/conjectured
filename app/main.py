from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from markdown import markdown
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.extra import ExtraExtension

import random

app = Flask(__name__)

with open('../.env', 'r') as data:
    line = data.readline()
    SECRET_KEY = line.split('\"')[1]
    app.config['SECRET_KEY'] = SECRET_KEY

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

ALLOWED_EXTENSIONS = {'md', 'png', 'jpg', 'jpeg'}

app.jinja_env.globals.update(randint=random.randrange)

from routes import *


if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5000, debug=True)