const express = require('express'); 
const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/login',async(req,res)=>{
  const { username, password } = req.body;
  if (!username || !password || username =='' || password == '') {
    res.json({msg:'Please provide both Username and Password'});
    return;
  }
  let sql = `SELECT * FROM user WHERE username=?`;
  db.query(sql, [username], async (err, result) => {
    if (!result || !(await bcrypt.compare(password, result[0].password))) {
      res.json({ msg: 'Username or Password is Incorrect' });
      return;
    }
    const id = result[0].id;
    const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log(`Generated Token: ${token}`);
    res.json({token,msg:'success'});
    console.log(result);
  })
});

router.post('/signup',async(req,res)=>{
  const { username, password } = req.body;
  db.query('SELECT username FROM user WHERE username=? ', [username], async (err, result) => {
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

module.exports = router;