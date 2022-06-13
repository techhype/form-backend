const express = require('express'); 
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/form/save-details',async(req,res)=>{
  const { firstname, lastname, middlename, address, email, phonenumber, height, weight } = req.body;
  
  console.log(firstname, lastname, middlename, address, email, phonenumber, height, weight)
  db.query('SELECT email FROM form WHERE email=? ', [email], async (err, result) => {
    if(err){
      console.log(err);
      return;
    }
    if (result.length > 0) {
      res.json({status: '500',error:'Form already submitted with same email'});
      return;
    }
    const id = uuidv4().slice(0,8);
    let sql = 'INSERT INTO form SET ?';
    db.query(sql, { id, firstname, lastname, middlename, address, email, phonenumber, height, weight }, async (err, result) => {
      if (err){
        res.json({status: '500',error: 'Error occured in saving form details'});
        throw err;
      } 
      console.log(`Row inserted successfully ${result}`);
      // res.json({message:'Created an Account'});       
      res.json({id,status: '200',message: 'Added Form details successfully'});
    });
  }); 
});

module.exports = router;