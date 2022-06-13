// Imports
const express = require('express');
const app = express();
const db = require('./config/database');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const dotenv = require('dotenv');
const fetch = require('node-fetch');


dotenv.config({ path: './.env'});
app.use(bodyParser.json());
app.use(authRoutes);
app.use(formRoutes);

// ENV variables
const hostName =process.env.HOSTNAME;
const PORT = process.env.PORT;

// //Create Database
// app.get('/createdb',(req,res)=>{
//   let sql = 'CREATE DATABASE testdata';
//   db.query(sql, (err,result)=>{
//     if(err) throw err;
//     res.send('database created');
//   })
// });

// // Create User Table
// app.get('/createUserTable',(req,res)=>{
//   let sql = `CREATE TABLE user
//             (id int AUTO_INCREMENT, username VARCHAR(255), 
//             email VARCHAR(255), password VARCHAR(255),
//             mnumber VARCHAR(20), PRIMARY KEY(id))`;
//   db.query(sql,(err,result)=>{
//     if(err) throw err;
//     res.send('Table created');
//   });
// });

// // Create Form Table
// app.get('/createFormTable',(req,res)=>{
//   let sql = `CREATE TABLE form (id VARCHAR(255), firstname VARCHAR(255),
//             lastname VARCHAR(255), middlename VARCHAR(255),
//             address VARCHAR(255), email VARCHAR(255), 
//             phonenumber VARCHAR(255), height DOUBLE, weight DOUBLE, PRIMARY KEY(id))`;
//   db.query(sql,(err,result)=>{
//     if(err) throw err;
//     res.send('Table created');
//   });
// });

app.listen(PORT,()=>{
  console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
