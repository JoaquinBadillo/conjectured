import os

from main import app
from flask import (abort, flash, get_flashed_messages, Markup,
                    redirect, render_template, Response, request, 
                    url_for, session)
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

def sudo(route):
    @functools.wraps(route)
    def next(*args, **kwargs):
        if session.get('logged_in'):
            return route(*args, **kwargs)
        return redirect(url_for('auth', next=request.path))
    return next

@app.route('/')
def index():
    # Get all tags that have been used in posts and get all posts
    tags = Tag.query.join(Post.tags).all()
    posts = Post.query.all()

    featured = posts[-3:]
    featured.reverse()
    morePosts = len(posts) - len(featured)
    return render_template("index.html", 
                            title = "Conjectured",
                            addNavbar = True, 
                            visibleTags = tags[:3],
                            hiddenTags = tags[3:],
                            posts = posts,
                            # Last 3 posts
                            featured = featured, 
                            # The rest of the posts (use index to iterate in reverse order)
                            morePosts = morePosts,
                            addFooter = True)

# TODO:
# Create a route to show content based by tag
# A good refactor could be to create an restful API that gets the posts
# Then the client side could generate the post views 
# Added benefit, the client sees more dynamism (instead of redirects)

@app.route('/auth', methods = ['GET', 'POST'])
def auth():
    next_url = request.args.get('next')
    form = forms.SudoForm(next_page = next_url)

    if form.validate_on_submit():
        user = Su.query.filter_by(username = form.username.data).first()
        if user and user.verify(form.password.data):
            session['logged_in'] = True
            return redirect(next_url or url_for('index')) 

    return render_template('auth.html', 
                            title = "Sudo Request", 
                            form = form,
                            next=next_url)

@app.route('/upload', methods = ['GET', 'POST'])
@sudo
def upload():
    form = forms.UploadPostForm()
    if form.validate_on_submit():
        content = request.files.getlist("content")
        cover = request.files["cover"]

        if not(content and cover):
            flash("Upload failed: Add cover and content")
            return redirect(url_for('index'))

        
        # Check that extensions are appropriate
        # These were already checked by JavaScript to enable submit
        # But anyone can add a button to HTML without passing the tests

        COVER_EXTENSIONS = {'png', 'jpg', 'jpeg'}
        if cover.filename.split('.')[-1] not in COVER_EXTENSIONS:
            flash("Upload failed: Unsupported cover image")
            return redirect(url_for('index'))

        CONTENT_EXTENSIONS = {'md', 'png', 'jpg', 'jpeg'}
        for file in content:
            if file.filename.split('.')[-1] not in CONTENT_EXTENSIONS:
                flash("Upload failed: Unsupported content")
                return redirect(url_for('index'))
            elif file.filename.split('.')[-1] == 'md':
                CONTENT_EXTENSIONS.remove('md')


        new_post = Post(title = form.title.data,
                        desc = form.desc.data)
        tags = []

        for tag_name in form.tags.data:
            tag = Tag.query.filter_by(tag_name = tag_name).first()

            # We will need to add the tag to DB if it doesn't exist yet
            # To keep track lets add them to a list with a bigger scope (tags)
            if not tag:
                tag = Tag(tag_name='Mathematics')
                tags.append(tag)

            new_post.tags.append(tag)
        
        # Check if new tags were created, then add them ti DB
        if tags:
            db.session.add_all(tags)
        
        # Add to session
        db.session.add(new_post)
        # Get session's post (now we have an id number)
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

            # All good, save to DB
            db.session.commit()

            flash("Post Uploaded!")
        except:
            # Directory exists, avoid overwriting
            flash("Fatal Error!")
            
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
    try:
        with open(f"./static/uploads/{index}/{content_path}", "r") as f:
            markdown_content = markdown(f.read(), 
                                        extensions=[
                                            CodeHiliteExtension(linenums=False, 
                                                css_class='highlight'), 
                                            ExtraExtension()
                                        ])
            # TODO:
            # Use micawber to embed videos on the HTML :)
            # This allows for more creative posts to be possible
            # Create CSS for highlighted code.
    except:
        # Post exists on database but content does not exist, raise internal server error
        abort(500)

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