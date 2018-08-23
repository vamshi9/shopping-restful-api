const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: `Let's order it babes` });
});

router.post('/', (req, res, next) =>{
  res.render('index', { title: `Let's order it babes: post request` });
});

router.post('/:orderId', (req, res, next) =>{
  const id = req.params.orderId;
  res.render('index', { title: `Your order is ${id}` });
});


module.exports = router;
