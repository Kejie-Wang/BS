var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next){
  res.render('login');
});

var auth = require('../db/authorization');
router.post('/auth/login', function(req, res, next){
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	auth.SignInAuth(username, password, (users)=>{
		console.log(users);
		if(users.length == 0)
			res.send({'success': false});
		else
			res.send({'success': true, 'url': '/'});
	});
});

module.exports = router;
