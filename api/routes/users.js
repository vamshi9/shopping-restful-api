const express = require('express');
const router = express.Router();

const User = require('../models/user');
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.getUser);

/*POST signup request */
router.post('/signup', userController.signup);

/*POST login request */
router.post('/login', userController.login);

/*DELETE User request*/
router.delete('/:userId', userController.userDetails);

module.exports = router;