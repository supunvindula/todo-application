# HOW TO RUN THE APPLICATION

Clone the repo by typing the following code in the cmd
```bash
git clone https://github.com/supunvindula/todo-application.git
```
open **cmd (or gitbash)** in the **backend-todo-application** and **backend-todo-application** directories.

Install the dependencies in both directories using `npm install`.

Add  `.env.local`  file in the project root directory and  `.env`  file in the backend directory.

## Database configuration
Create MySql schema using mysql workbench (recommended) or any other software.

In the **backend-todo-application/config/config.json** add your schema name into database name.
```
{
  "development": {
    "database": "<Databse_name>",
  }
}
```
And then enter database root credentials.
```
{
  "development": {
    "username": "<username>",
    "password": "<password>",
  }
}
```

Run the command `sequelize db:migrate` in the terminal open in the backend directory. It will create tables by migrating the database.

To seed the dummy data run the following code. It will only add todos. **You have to add users**

    sequelize db:seed --seed 20220703060133-todo-seeder

## STARTING BACKEND AND FRONTEND
On both directories run `npm run dev` to start the server and UI.

## To test the backend
Run `npm test` in backend directory. mocha, chai and chai-http has been used to test the backend API.
![test result](https://github.com/supunvindula/todo-application/blob/main/test-result.JPG)
