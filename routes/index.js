const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.sendFile(path.join(__dirname + '/dist/index.html'));
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  // res.render('index');
});

module.exports = router;
