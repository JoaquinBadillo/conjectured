from main import app, db
from flask import (render_template, redirect, url_for, flash, get_flashed_messages, session, 
                    request, Response, Markup)
import functools
from models import Tag, Post, Su
import forms

from werkzeug.security import generate_password_hash, check_password_hash

from markdown import markdown
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.extra import ExtraExtension

from micawber import parse_html

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
                            older_posts = posts,
                            addFooter = True)

@app.route('/auth', methods = ['GET', 'POST'])
def auth():
    next_url = request.args.get('next') or request.form.get('next')
    form = forms.SudoForm()
    if form.validate_on_submit():
        user = Su.query.filter_by(username = form.username.data).first()
        print(user)
        print(form.password.data)
        print(user.verify(form.password.data))
        print(user.verify("secret!"))
        if user and user.verify(form.password.data):
            print("valid!")
            session['logged_in'] = True
            session.permanent = True
            return redirect(next_url or url_for('index'))

    return render_template('auth.html', 
                            title = "Sudo Request", 
                            form = form,
                            next_url=next_url)

@app.route('/upload', methods = ['GET', 'POST'])
@sudo
def upload():
    form = forms.UploadPostForm()
    if form.validate_on_submit():
        new_post = Post(title = form.title.data,
                                desc = form.desc.data)
        for file in form.files.data:
            file_filename = secure_filename(file.filename)
            data.save(os.path.join(app.config['UPLOAD_FOLDER'], data_filename))
        

        return render_template('upload.html', 
                                title = "Upload", 
                                form=form)
    return render_template('upload.html', 
                            title = "Upload", 
                            form=form)

@app.route('/pub-<index>')
def pub(index):
    post = Post.query.get(index)
    content_path = post.content_path
    markdown_content = ""
    with open(f".{url_for('static', filename = 'uploads/' + content_path)}", "r") as f:

        markdown_content = markdown(f.read(), 
                                    extensions=[
                                        CodeHiliteExtension(linenums=False, css_class='highlight'), 
                                        ExtraExtension()
                                    ])
        
    return render_template('pub.html', post = markdown_content)

@app.route('/md')
def md():
    with open("./static/uploads/test.md", "r") as f:
        markdown_content = markdown(f.read())
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