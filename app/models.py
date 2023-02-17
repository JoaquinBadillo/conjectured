from main import db
from datetime import datetime
from itertools import cycle

from werkzeug.security import generate_password_hash, check_password_hash

class TagCycler():
    def __init__(self, tags):
        self.tags = cycle(tags)
        self.current = next(self.tags)

    def advance(self):
        self.current = next(self.tags)

# Super Users (accounts that can post)
class Su(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(60), nullable = False) 
    password = db.Column(db.String(120))
    
    # Password Getter
    @property
    def password(self):
        try:
            return self._password
        except AttributeError:
            return ''

    # Password Setter 
    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)
    
    def verify(self, password):
        return check_password_hash(self.password, password)

# Post <--> Tag
tag_post = db.Table(
    'tag_post',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('page_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

# Tags to categorize posts
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    tag_name = db.Column(db.String(50), nullable = False)

    def __repr__(self):
        return self.tag_name

# Blog post data used for views
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), nullable = False)
    pub_date = db.Column(db.Date, default = datetime.now())
    desc = db.Column(db.String(220), nullable = False)
    cover_path = db.Column(db.String(50), nullable = False)
    content_path = db.Column(db.String(50), nullable = False)
    tags = db.relationship('Tag', secondary=tag_post, backref='posts')

    def __repr__(self):
        return self.title