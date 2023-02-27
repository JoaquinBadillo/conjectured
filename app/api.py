# API v1

# TODO:
# Change folder structure to have API versions in a directory
# Requires some __init__.py shenanigans
# E.g. an "aplication factory"

from main import app
from flask import jsonify, request, abort
from models import *

# Get data for a single post
@app.route('/api/v1/post/<index>', methods=['GET'])
def getPost(index):
    post = Post.query.get(index)

    if not post:
        flash("Error: Invalid Post Number")
        return redirect(url_for('index'))

    
    data = {
        "title": post.title,
        "desc": post.desc,
        "cover": post.cover_path,
        "content": post.content_path
    }
    
    return jsonify(data)

# Get data for all posts
@app.route('/api/v1/posts/', methods=['GET'])
def getPosts():
    posts = Post.query.all()
    data = {}

    for post in posts:
        post_data = {
                "title": post.title,
                "desc": post.desc,
                "cover": post.cover_path,
                "content": post.content_path
            }

        data[post.id] = post_data
    
    return jsonify(data)