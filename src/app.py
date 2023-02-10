from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from markdown import markdown
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.extra import ExtraExtension

app = Flask(__name__)

with open('.env', 'r') as data:
    line = data.readline()
    SECRET_KEY = line.split('\"')[1]
    app.config['SECRET_KEY'] = SECRET_KEY

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

ALLOWED_EXTENSIONS = {'md', 'png', 'jpg', 'jpeg'}

from routes import *

if __name__ == '__main__':
    app.run(host = "0.0.0.0", debug=True)