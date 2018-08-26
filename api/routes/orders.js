const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/auth');
const orderController = require('../controllers/order');

/* GET Orders page. */
router.get('/', checkAuth, orderController.getOrders);

/* POST Order  */
router.post('/', checkAuth, orderController.createOrder);

router.get('/:orderId', checkAuth, orderController.getOrderId);


module.exports = router;