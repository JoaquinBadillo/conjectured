from main import app, db
from flask import (render_template, redirect, url_for, flash, get_flashed_messages, session, 
                    request, Response)
import functools
import models
import forms

from werkzeug.security import generate_password_hash, check_password_hash

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
    tags = models.Tag.query.join(models.Post.tags).all()
    posts = models.Post.query.all()

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
    form = forms.SudoForm()
    return render_template('auth.html', 
                            title = "Sudo Request", 
                            form = form)

@app.route('/upload', methods = ['GET', 'POST'])
#@sudo
def upload():
    form = forms.UploadPostForm()
    if form.validate_on_submit():
        new_post = models.Post(title = form.title,
                                desc = form.desc)
        for file in form.files.data:
            file_filename = secure_filename(file.filename)
            data.save(os.path.join(app.config['UPLOAD_FOLDER'], data_filename))
        

        return render_template('upload.html', 
                                title = "Upload", 
                                form=form)
    return render_template('upload.html', 
                            title = "Upload", 
                            form=form)

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