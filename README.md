# Conjectured 📐📖

This is the source code for a blog where I want to post computer science and mathematics posts. It uses flask as the backend framework and a database to store the posts, tags and users for it to be dynamic.

## Executing the app

This project is still in development, but it can be executed in your localhost with the source code. To do so use the `npm run dev` command.

### Dependencies

Before executing the app, there are some dependencies that must be installed in your system. To install them you must first have node and npm already installed in your system. Then you can use the `npm install` command to install all the dependencies.

### Environment variables

The database connection was made for a PostgreSQL database.
For cloud storage the app uses Supabase, the URL and Service Key are therefore required for the project to work locally.

Here is an example of the environment variables that must be set for the app to work:

```{env}
DATABASE_URL=postgresql://user:password/localhost/database
STORAGE_URL=https://your-storage-url
SERVICE_KEY=your-storage-key
```