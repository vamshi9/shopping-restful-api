const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: `Let's do Shopping baby` });
});

/* GET products */
router.get('/products', (req, res, next) =>{
  res.render('index', { title: `This is procucts page!` });
});
router.post('/products', (req, res, next) =>{
  const product = {
    title: `Products`,
    name: req.body.name,
    price: req.body.price
  };
  res.render('index', product);
});

/* GET product id */
router.get('/products/:productId', (req, res, next) =>{
  const id = req.params.productId;
  if(id  === 'toothpaste'){
    res.render('index',{title : `Yay! you've found your toothpaste`});
  }else{
    res.render('index',{title : `Sorry, item not found!`});
  }
});

/*PATCH & DELETE product */
router.patch('/products/:productId', (req, res, next) =>{
  res.render('index',{title : `Product Updated`});
});
router.delete('/products/:productId', (req, res, next) =>{
  res.render('index',{title : `Product deleted`});
});



module.exports = router;
