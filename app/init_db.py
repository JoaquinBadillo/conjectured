from main import app
from models import *
from flask import url_for
from werkzeug.security import generate_password_hash, check_password_hash

with app.app_context():
        # TODO:
        # This program was used for testing during initial development
        # Now its should only initialize the database columns (drop all and create all)
        # Creating posts should now be left for a unit test on the upload function/route

        db.drop_all()
        db.create_all()
        post1 = Post(title='Exponentials and Logarithms', 
                        desc="""Logarithms often arise when something gets divided iteratively; when 
                        studying them I found out their properties are better understood when 
                        looking at the opposite situation, when something gets multiplied 
                        repeatedly.""",
                        cover_path="test1.png",
                        content_path = "test.md")
        post2 = Post(title='Coordinate Systems', 
                        desc="""We often use cartesian coordinates to define points in space. But this
                        is not the only way to do so. Using latitude and longitude in the Earth is 
                        fundamentally different.""",
                        cover_path="test2.png", 
                        content_path = "test.md")
        post3 = Post(title='Post 3', 
                        desc='Test', 
                        cover_path="test1.png", 
                        content_path = "test.md")
    
        user1 = Su(username = 'Tester', password='secret!')

        tag1 = Tag(tag_name='Mathematics')
        tag2 = Tag(tag_name='Data Structures')
        tag3 = Tag(tag_name='Algorithms')
        tag4 = Tag(tag_name='Programming')
        tag5 = Tag(tag_name='Networks')

        post1.tags.append(tag1) 
        post1.tags.append(tag4) 
        post2.tags.append(tag3) 
        post2.tags.append(tag2)  
        post2.tags.append(tag4) 

        db.session.add_all([post1, post2, post3])
        db.session.add_all([tag1, tag2, tag3, tag4, tag5])
        db.session.add_all([user1])

        db.session.commit()