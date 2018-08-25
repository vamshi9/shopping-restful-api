const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');

/* GET home page. */
router.get('/', (req, res, next) =>{
  
  Order.find()
    .select('_id product quantity')
    .populate('product','name price')
    .exec()
    .then(result => {
      console.log(result);
      res.status(201).json({
        count : result.length,
        orders: result.map(o => {
          return {
            _id: o._id,
            product: o.product,
            quantity: o.quantity,
            request: {
              type: 'GET',
              url: `http://localhost:2707/orders/${o._id}`
            } 
          }
        }),
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    })
});

router.post('/', (req, res, next) =>{
  Product.findById(req.body.productId)
    .exec()
    .then(product => {
      if(!product){
        return res.status(404).json({
          message: "Product not found!"
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save()
    }) 
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });
  });
  
  router.get('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    Order.findById(id)
    .populate('product')
    .exec()
    .then(order => {
      if(!order){
        return res.status(404).json({
          message: 'Order not found' 
        })
      }
      res.status(200).json({
        order: order,
        request: {
          type: 'GET',
          url: 'http://localhost:2707/orders'
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });
    
});


module.exports = router;
