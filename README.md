# Conjectured 📐📖

This is the source code for a blog where I want to post computer science and mathematics posts. It uses flask as the backend framework and a database to store the posts, tags and users for it to be dynamic.

## Executing the app

This project is still in development, but it can be executed in your localhost with the source code. To do so use the `npm run dev` command.

### Dependencies

Before executing the app, there are some dependencies that must be installed in your system. To install them you must first have node and npm already installed in your system. Then you can use the `npm install` command to install all the dependencies.

### Database

The database connection was made for a PostgreSQL database. You will need to create a `.env` file and provide the URL for your database. For instance, using a local database, the `.env` file should look like this:

```
DATABASE_URL=postgresql://localhost/conjectured
```

To use locally you must first have PostgreSQL installed in your system. Then you can create the database with the `createdb` command. The database name must be `conjectured`. Then you can create the tables with the `psql -d conjectured -f db.sql` command.