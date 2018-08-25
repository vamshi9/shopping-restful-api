const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

/*Multer*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
}); 

//format filter
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }else{
    cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  limits:{
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require('../models/products');

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: `Let's do Shopping baby` });
});

/* GET products */
router.get('/products', (req, res, next) =>{
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(result => {
      //console.log(result);
      const response = {
        count: result.length,
        products: result
      }
      res.status(200).json(response);
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({error : err});
    });
});

/*POST products */
router.post('/products', upload.single('productImage') ,(req, res, next) =>{
  console.log(req.file);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,  
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.render('index', product);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error:err});
    });
    
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

/*PATCH product */
router.patch('/products/:productId', (req, res, next) =>{
  const id = req.params.productId;
  const updates = {};
  for(const changes of req.body){
    updates[changes.propName] = changes.value;
  }
  Product.update( {_id: id}, { $set: updates })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });
});


/*DELETE product */
router.delete('/products/:productId', (req, res, next) =>{
  const id = req.params.productId;
  Product.remove({_id: id})
    .exec()
    .then(result => {
      //console.log(result);
      res.status(200).json({
        message: 'Product successfully deleted!',
        request: {
          type: 'POST',
          url: 'localhost:3000/products',
          body:result
        }
      });
    })
    .catch(err => {
      res.status(500).json({error:err});
    });
});



module.exports = router;
