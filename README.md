# Round 2 Part 2 - Vitasoft

## Form-Backend

This project was built with Node JS as backend with MySQL as database.

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
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