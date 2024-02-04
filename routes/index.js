const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.sendFile(path.join(__dirname + 'client/dist/index.html'));
  res.render('index');
});

router.post('/add-account', function (req, res, next) {
  console.log('received request', req.body.riotId);
  res.redirect('/');
});

module.exports = router;
