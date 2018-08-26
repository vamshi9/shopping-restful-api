const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const checkAuth = require('../middleware/auth');
const Product = require('../models/products');
const productController = require('../controllers/products');
const Multer = require('../controllers/multer');


/* GET home page. */
router.get('/', productController.homePage);

/* GET products */
router.get('/products', productController.getProducts);

/*POST products */
router.post('/products', checkAuth, Multer.upload.single('productImage'), productController.createProducts);

/* GET product id */
router.get('/products/:productId', productController.getProduct);

/*PATCH product */
router.patch('/products/:productId', checkAuth, productController.updateProduct);

/*DELETE product */
router.delete('/products/:productId', checkAuth, productController.deleteProduct);

module.exports = router;