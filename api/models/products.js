const mongoose = require('mongoose');

const productSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    name: { type: String, required: true},
    price: { type: Number, required: true}
}

module.exports = mongoose.model('Product', productSchema);