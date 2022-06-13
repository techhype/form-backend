# Round 2 Part 2 - Vitasoft

## Form-Backend

This project was built with Node JS as backend with MySQL as database.

## Routes

    - /signup ( registers the new user in the database)
      - input: username, password 
      - password: JWT Token

    - /login (login user using token)
      - input: username, password
      - output: JWT Token

    - /form/save-details ( saves the form details to database )
      - input:  firstname, lastname, middlename, address, email, phonenumber, height, weight
      - output: id,status,message
    
    - /form/delete-details/<<id>> ( delete the form details of the unique id from database)
      - input: id (URL parameter)
      - output: id,status,message

## Install

    $ git clone https://github.com/techhype/form-backend.git
    $ cd form-backend
    $ npm install

## MySQL connectivity

    - Install MySQL server on your local machine (https://dev.mysql.com/downloads/installer/)
    - Run the MySQL server on default port 3306
    - Provide the authentication details configured for DB in .env file
      `DATABASE_HOST= <<localhost>> or <<hosted-DB-url>>
       DATABASE_USER= <<database-username>>
       DATABASE_PW= <<database-password>>
       DATABASE= <<database-name>>`

## Running the project

    $ npm start

    - Note: Please provide the env details in .env file before running the node server

## Environment Variables

    - Create .env file after install
    - Place the environment variables in .env file

      `HOSTNAME=localhost
       PORT=5000
       DATABASE_HOST= <<localhost>> or <<hosted-DB-url>>
       DATABASE_USER= <<database-username>>
       DATABASE_PW= <<database-password>>
       DATABASE= <<database-name>>
       JWT_SECRET= <<secret-key>>
       JWT_EXPIRES_IN = 2h`