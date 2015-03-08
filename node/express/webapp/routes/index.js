var express = require('express');
var router = express.Router();
path= require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout',{ title: 'fuck you!' });
});

router.get('/test', function(req, res, next) {
  res.send({ title: 'fuck you!' });
});

module.exports = router;
