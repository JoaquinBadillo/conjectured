import os

from main import app, db
from flask import (render_template, redirect, url_for, flash, get_flashed_messages, session, 
                    request, Response, Markup)
import functools
from models import *
import forms

from werkzeug.urls import url_parse
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from markdown import markdown
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.extra import ExtraExtension

# from micawber import parse_html -- Used to embed videos

ALLOWED_EXTENSIONS = {'md', 'png', 'jpg', 'jpeg'}

def sudo(route):
    @functools.wraps(route)
    def next(*args, **kwargs):
        if session.get('logged_in'):
            return route(*args, **kwargs)
        return redirect(url_for('auth', next=request.path))
    return next

@app.route('/')
def index():
    # Get all tags that have been used in posts
    tags = Tag.query.join(Post.tags).all()
    posts = Post.query.all()

    return render_template("index.html", 
                            title = "Conjectured",
                            addNavbar = True, 
                            visibleTags = tags[:3],
                            hiddenTags = tags[3:],
                            featured = posts[:3],
                            morePosts = posts[3:],
                            addFooter = True)

@app.route('/auth', methods = ['GET', 'POST'])
def auth():
    next_url = request.args.get('next')
    form = forms.SudoForm(next_page = next_url)

    if form.validate_on_submit():
        user = Su.query.filter_by(username = form.username.data).first()
        if user and user.verify(form.password.data):
            session['logged_in'] = True
            session.permanent = True
            return redirect(next_url or url_for('index')) 

    return render_template('auth.html', 
                            title = "Sudo Request", 
                            form = form,
                            next=next_url)

@app.route('/upload', methods = ['GET', 'POST'])
@sudo
def upload():
    # TODO: Validate data before saving
    # Check that the files have the allowed extensions
    # Check that a single markdown file was uploaded

    form = forms.UploadPostForm()
    if form.validate_on_submit():
        content = request.files.getlist("content")
        cover = request.files["cover"]

        if not(content and cover):
            flash("Upload failed: Add cover and content")
            return redirect(url_for('index'))

        new_post = Post(title = form.title.data,
                        desc = form.desc.data)
        tags = []

        for tag_name in form.tags.data:
            tag = Tag.query.filter_by(tag_name = tag_name).first()
            if not tag:
                tag = Tag(tag_name='Mathematics')
                tags.append(tag)
            new_post.tags.append(tag)
        
        if tags:
            db.session.add_all(tags)

        db.session.add(new_post)

        new_post = Post.query.filter_by(title = form.title.data).first()
        
        directory = app.config['UPLOAD_FOLDER'] + str(new_post.id)

        try:
            os.mkdir(directory)

            for file in content:
                filename = secure_filename(file.filename)
                file.save(os.path.join(directory, filename))
                if filename.split(".")[-1] == "md":
                    new_post.content_path = filename
            
            filename = secure_filename(cover.filename)
            cover.save(os.path.join(directory, filename))
            new_post.cover_path = filename

            db.session.commit()

            flash("Post uploaded!")
        except:
            flash("Fatal error!")
            
        return redirect(url_for('index'))

    return render_template('upload.html', 
                            title = "Upload", 
                            form = form)

@app.route('/posts/<index>')
def pub(index):
    post = Post.query.get(index)

    # If post does not exist redirect to index
    if not post:
        flash("Error: Invalid Post Number")
        return redirect(url_for('index'))

    # Parse markdown
    content_path = post.content_path
    markdown_content = ""
    with open(f"./static/uploads/{index}/{content_path}", "r") as f:

        markdown_content = markdown(f.read(), 
                                    extensions=[
                                        CodeHiliteExtension(linenums=False, css_class='highlight'), 
                                        ExtraExtension()
                                    ])
        
    return render_template('pub.html', post = markdown_content)


# Invalid URL
@app.errorhandler(404)
def page_not_found(e):
    flash("Error 404: Invalid URL")
    return redirect(url_for('index'))

# Internal Server Error
@app.errorhandler(500)
def page_not_found(e):
    flash("Error 500: Internal Server Error")
    return redirect(url_for('index'))