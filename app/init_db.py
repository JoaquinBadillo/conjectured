from main import app
from models import db, Post, Tag, tag_post

with app.app_context():
    db.drop_all()
    db.create_all()

    post1 = Post(title='Post 1', desc='1.1', cover_path="1.c", content_path = "1.p")
    post2 = Post(title='Post 2', desc='2.1', cover_path="2.c", content_path = "2.p")
    post3 = Post(title='Post 3', desc='3.1', cover_path="2.c", content_path = "3.p")

    tag1 = Tag(tag_name='Mathematics')
    tag2 = Tag(tag_name='Data Structures')
    tag3 = Tag(tag_name='Algorithms')
    tag4 = Tag(tag_name='Programming')
    tag5 = Tag(tag_name='Networks')

    post1.tags.append(tag1)  # Tag the first post with 'animals'
    post1.tags.append(tag4)  # Tag the first post with 'writing'
    post3.tags.append(tag3)  # Tag the third post with 'cooking'
    post3.tags.append(tag2)  # Tag the third post with 'tech'
    post3.tags.append(tag4)  # Tag the third post with 'writing'


    db.session.add_all([post1, post2, post3])
    db.session.add_all([tag1, tag2, tag3, tag4, tag5])

    db.session.commit()