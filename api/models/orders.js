const mongoose = require('mongoose');

const orderSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    quantity: {type: Number, default: 0},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}

module.exports = mongoose.model('Order', orderSchema);