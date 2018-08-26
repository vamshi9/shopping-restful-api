const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user'); 

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find()
    .select('id email password')
    .exec()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status.json({
        message: 'Damn! Something is wrong buddy'
      });
    });
});

/*POST signup request */
router.post('/signup', (req,res,next) => {
  
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1){
        res.status(409).json({
          message: 'Sorry, emailId has already been registered bitch!'
        });
      }else{
        bcrypt.hash(req.body.password, 9, (err,hash) =>{
          if(err){
            return res.status(500).json({error : err});
          }else{
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User Created'
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
              });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });  
});

/*POST login request */
router.post('/login', (req,res,next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1){
        return res.status(401).json({
          message: 'You are not register to enter, bitch!'
        });
      }
      bcrypt.compare(req.body.password,user[0].password, (err,result) => {
        if(err){
          return res.status(401).json({
            message: 'Authentication failed'
          });
        }
        if(result){
          return res.status(200).json({
            message: 'Authentication Successfull, mama!'
          });
        }
        res.status(401).json({
          message: 'Authentication failed, type again da!'
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Something went wrong buddy, try again!'
      });
    });
});

/*DELETE User request*/
router.delete('/:userId', (req,res,next) => {
  User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'User Successfully deleted',
        request: {
          type: 'GET',
          url: 'http://localhost:2707/signup'
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Back off man! User does not exist' 
      });
    });
})

module.exports = router;
