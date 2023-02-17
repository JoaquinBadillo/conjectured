from flask_wtf import FlaskForm

from wtforms import Field, MultipleFileField, SelectField, StringField, SubmitField
from flask_wtf.file import FileField, FileRequired

from wtforms.validators import DataRequired
from wtforms.widgets import TextArea, TextInput

class SudoForm(FlaskForm):
    user = StringField(u'User', validators = [DataRequired()])
    password = StringField(u'Password', validators = [DataRequired()])
    submit = SubmitField(u'Submit');

class TagListField(Field):
    widget = TextInput()

    def _value(self):
        if self.data:
            return u', '.join(self.data)
        else:
            return u''

    def process_formdata(self, valuelist):
        if valuelist:
            self.data = [x.strip() for x in valuelist[0].split(',')]
        else:
            self.data = []

class UploadPostForm(FlaskForm):
    title = StringField(u'Title', validators = [DataRequired()])
    tags = TagListField(u'Tags')
    desc = StringField(u'Description', widget=TextArea(), validators = [DataRequired()])
    cover = FileField(u'Cover', validators=[FileRequired()])
    content = MultipleFileField(u'Content', validators=[FileRequired()])
    submit = SubmitField(u'Submit');