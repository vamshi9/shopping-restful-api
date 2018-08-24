const mongoose = require('mongoose');

const productSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    name: String,
    price: Number
}

module.exports = mongoose.model('Product', productSchema);