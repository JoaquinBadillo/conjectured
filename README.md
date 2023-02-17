# Conjectured 📐📖

This is the source code for a blog where I want to post computer science and mathematics posts. It uses flask as the backend framework and a database to store the posts, tags and users for it to be dynamic.

## Executing the app

This project is still in development, but it can be executed in your localhost with the source code. To do so navigate to the `app/` directory and execute the `main.py` program.

### Dependencies

However, there are some dependencies that must be installed and it is recommended to create a virtual environment for them. This can be done relatively easily:

1. Navigate to the root folder on a terminal

2. Create the virtual environment

    `$ python3 -m venv environment_name`

3. Activate the virtual environment

    For UNIX based systems:

    `source environment_name/bin/activate`  

4. Install the dependencies from the requirements file

    `pip install -r requirements.txt`

### Database

The database has been added to the gitignore file and therefore you should use the `init_db.py` found in the `app/` directory to initialize one.