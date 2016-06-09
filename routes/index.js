var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next){
  res.render('login');
});

router.post('/auth/login', function(req, res, next){
	console.log(req.body);
});

module.exports = router;
