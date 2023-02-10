from app import app, db
from flask import render_template, redirect, url_for, flash, get_flashed_messages
import forms

@app.route('/')
def index():
    return render_template("index.html", 
                            title = "Conjectured",
                            addNavbar = True, 
                            tags = ["Algorithms", "Data Structures", "Calculus", "Linear Algebra"],
                            addFooter = True)

@app.route('/auth', methods = ['GET', 'POST'])
def auth():
    form = forms.SudoForm()
    return render_template('auth.html', 
                            title = "Sudo Request", 
                            form = form)

@app.route('/upload', methods = ['GET', 'POST'])
def upload():
    form = forms.UploadPostForm()
    if form.validate_on_submit():
        for file in form.files.data:
            file_filename = secure_filename(file.filename)
            data.save(os.path.join(app.config['UPLOAD_FOLDER'], data_filename))
        return render_template('upload.html', 
                                title = "Upload", 
                                form=form, 
                                addFooter = True)
    return render_template('upload.html', 
                            title = "Upload", 
                            form=form,
                            addFooter = True)

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