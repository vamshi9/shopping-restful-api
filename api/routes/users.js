const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkAuth = require('../middleware/auth');

/* GET users listing. */
router.get('/', checkAuth, userController.getUser);

/*POST signup request */
router.post('/signup' ,userController.signup);

/*POST login request */
router.post('/login' ,userController.login);

/*DELETE User request*/
router.delete('/:userId', checkAuth ,userController.userDetails);

module.exports = router;