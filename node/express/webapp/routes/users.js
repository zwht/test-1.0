var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userID', function(req, res, next) {
  res.render({userName:"zw",userId:"001"});
});

module.exports = router;
