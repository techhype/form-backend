const express = require('express'); 
const db = require('../database');

const router = express.Router();

router.post('/form/save-details',async(req,res)=>{
  const { firstname, lastname, middlename, address, email, phonenumber, height, weight } = req.body;
  db.query('SELECT id FROM formdetails WHERE =? ', [username], async (err, result) => {
    if(err){
      console.log(err);
      return;
    }
    if (result.length > 0) {
      res.json({error:'Username already in use!!'});
      return;
    }
    let hashedPassword = await bcrypt.hash(password, 8);
    let sql = 'INSERT INTO user SET ?';
    db.query(sql, { username, password: hashedPassword }, async (err, result) => {
      if (err) throw err;
      console.log(`Row inserted successfully ${result}`);
      // res.json({message:'Created an Account'});  
      const id = result.insertId;
      const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.json({token,username});
    });
  }); 
});