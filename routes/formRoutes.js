const express = require('express'); 
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post('/form/save-details',
  [
    check('firstname').exists().withMessage('First Name must exist')
                      .notEmpty().withMessage('First Name must not be empty')
                      .isString().withMessage('First Name must be string'),
    check('lastname').exists().withMessage('Last Name must exist')
                     .notEmpty().withMessage('Last Name must not be empty')
                     .isString().withMessage('Last Name must be string'),
    check('middlename').exists().withMessage('Middle Name must exist')
                       .notEmpty().withMessage('Middle Name must not be empty')
                       .isString().withMessage('Midle Name must be string'),
    check('address').exists().withMessage('Address must exist')
                       .notEmpty().withMessage('Address must not be empty')
                       .isString().withMessage('Address must be string'),
    check('phonenumber').exists().withMessage('Phone Number must exist')
                        .notEmpty().withMessage('Phone Number must not be empty')
                        .isString().matches(/^\+?\d{11,18}$/).withMessage('Phone Number must contain only digits'),
    check('email').exists().notEmpty().normalizeEmail().isEmail().withMessage('Email should be in correct format'),
    check('height').exists().notEmpty().isFloat().withMessage('Invalid height value'),
    check('weight').exists().notEmpty().isFloat().withMessage('Invalid height value')
  ],
  async(req,res)=>{

  const { firstname, lastname, middlename, address, email, phonenumber, height, weight } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  db.query('SELECT email FROM form WHERE email=? ', [email], async (err, result) => {
    if(err){
      console.log(err);
      return;
    }
    if (result.length > 0) {
      res.status(500).json({status: '500',error:'Form already submitted with same email'});
      return;
    }
    const id = uuidv4().slice(0,8);
    let sql = 'INSERT INTO form SET ?';
    db.query(sql, { id, firstname, lastname, middlename, address, email, phonenumber, height, weight }, async (err, result) => {
      if (err){
        res.status(500).json({status: '500',error: 'Error occured in saving form details'});
        throw err;
      } 
      console.log(`Row inserted successfully ${result}`);
      // res.json({message:'Added Form'});       
      res.status(200).json({id,status: '200',message: 'Added Form details successfully'});
    });
  }); 
});


router.post('/form/delete-details/:id', async (req, res) => {
  const deletionId = req.params.id;
  db.query('SELECT id FROM form WHERE id=? ', [deletionId], async (err, result) => {
    if(err){
      console.log(err);
      return;
    }
    if (result.length < 0) {
      res.status(500).json({status: '500',error:'No Form details with the provided id'});
      return;
    }
    let sql = 'DELETE FROM form WHERE id=? ';
    db.query(sql, [deletionId], async (err, result) => {
      if (err){
        res.json({status: '500',error: 'Error occured in saving form details'});
        throw err;
      } 
      console.log(`Row deleted successfully ${result}`);
      // res.json({message:'Deleted the form detail'});       
      res.status(200).json({id: deletionId,status: '200',message: `Deleted Form detail with ${deletionId} successfully`});
    });
  }); 
});

module.exports = router;