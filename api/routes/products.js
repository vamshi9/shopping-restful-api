const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: `Let's do Shopping baby` });
});

/* GET products */
router.get('/products', (req, res, next) =>{
  res.render('index', { title: `This is procucts page!` });
});

/*POST products */
router.post('/products', (req, res, next) =>{
  
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
    
  res.render('index', product);
});

/* GET product id */
router.get('/products/:productId', (req, res, next) =>{
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(result => {
      console.log(result);
      res.render('index',{title: 'Yay, we found our product'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });
});

/*PATCH & DELETE product */
router.patch('/products/:productId', (req, res, next) =>{
  res.render('index',{title : `Product Updated`});
});
router.delete('/products/:productId', (req, res, next) =>{
  res.render('index',{title : `Product deleted`});
});



module.exports = router;
