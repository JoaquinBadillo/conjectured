from flask import Flask, render_template, redirect, url_for, flash, get_flashed_messages

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key'

@app.route('/')
def index():
    return render_template("index.html", 
                            title = "Conjectured", 
                            tags = ["Algorithms", "Data Structures", "Calculus", "Linear Algebra"])

@app.route('/user/<name>')
def user(name:str):
    return render_template("user.html", name = name.capitalize())


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