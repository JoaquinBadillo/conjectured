from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

with open('.env', 'r') as data:
    line = data.readline()
    SECRET_KEY = line.split('\"')[1]
    app.config['SECRET_KEY'] = SECRET_KEY

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

from routes import *