from app import db
from datetime import datetime
from flask_sqlalchemy import flask_sqlalchemy

# Blog post class for ORM
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    pubDate = db.Column(db.Date, nullable = False)
    desc = db.Column(db.String(280), nullable = False)
    coverPath = db.Column(db.String(40), nullable = False)
    contentPath = db.Column(db.String(40), nullable = False)