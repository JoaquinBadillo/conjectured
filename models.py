from app import db
from datetime import datetime
from flask_sqlalchemy import flask_sqlalchemy

tag_post = db.Table(
    'tag_post',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('page_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

# Blog post class for ORM
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    pub_date = db.Column(db.Date, nullable = False)
    desc = db.Column(db.String(220), nullable = False)
    cover_path = db.Column(db.String(40), nullable = False)
    content_path = db.Column(db.String(40), nullable = False)
    tags = db.relationship('Tag', secondary=tags, lazy='subquery',
        backref=db.backref('posts', lazy=True))

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    tag_name = db.Column(db.String(40), nullable = False)