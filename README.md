# opdracht-1-to-do-application-pgm-arnoboenders

## Just-Do-It

This is a todo application with a couple of handy features. First of all this application is userbased meaning you have to use an account to see/make todo's. This also means you don't ever lose your items.
The application lets you create todo's, tick them off and untick them, edit them by just typing in the field and delete the todo's. The todo's are sorted by category and you need to click on the category to see the todo's under them. You can ofcourse create categories.
There is the handy feature to mail the todo's to an email of your choosing. The email then has the tasks of which category you were in.

## Features

- Registration
- Login
- Creating todo's
- Checking todo's
- Unchecking todo's
- Deleting todo's
- Editing todo's
- Creating categories
- Mailing tasks to a email of choosing

## Installation

- npm i
- npx knex migrate:latest && npx knex seed:run
- make .env file (look below for necessary variables)
- npm run start:dev

## .ENV file

- PORT=
- DATABASE_TYPE=
- DATABASE_NAME=
- NODE_ENV=
- TOKEN_SALT=
