const Product = require('../models/products');
const mongoose = require('mongoose');

exports.homePage = (req, res, next) => {
    res.render('index', {
        title: `Let's do Shopping baby`
    });
}

exports.getProducts = (req, res, next) => {
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
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.createProducts = (req, res, next) => {
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
            res.status(500).json({
                error: err
            });
        });

}

exports.getProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.render('index', {
                title: 'Yay, we found our product'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.updateProduct = (req, res, next) => {
    const id = req.params.productId;
    const updates = {};
    for (const changes of req.body) {
        updates[changes.propName] = changes.value;
    }
    Product.update({
            _id: id
        }, {
            $set: updates
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({
            _id: id
        })
        .exec()
        .then(result => {
            //console.log(result);
            res.status(200).json({
                message: 'Product successfully deleted!',
                request: {
                    type: 'POST',
                    url: 'localhost:3000/products',
                    body: result
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}