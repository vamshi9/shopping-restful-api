const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: `Let's do Shopping baby` });
});

module.exports = router;
