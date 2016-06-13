var express = require('express');
var router = express.Router();
// var cookie = require('cookie');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next){
  res.render('login');
});

router.get('/register', function(req, res, next){
	res.render('register');
});

var register = require('../db/userManager');
router.post('/auth/register', function(req, res, next){
	console.log("req.body", req.body);
	register.createAnUser(req.body, (err, vals)=>{
		var msg={
			success:true,
			err: "",
			url:"/index"
		};
		if(err){
			msg['err'] = err;
			msg['success'] = false;
			msg['url'] = '/register';
		}
		console.log("msg", msg);
		res.send(msg);
	});
});

var auth = require('../db/authorization');
router.post('/auth/login', function(req, res, next){
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	res.cookie("username", username);	//write the cookies
	res.cookie("password", password);
	auth.signInAuth(username, password, (users)=>{
		console.log(users);
		if(users.length == 0)
			res.send({'success': false});
		else
			res.send({'success': true, 'url': '/index'});
	});
});

router.get('/index', function(req, res, next){
	console.log(req.cookies);
	var username = req.cookies.username;
	var password = req.cookies.password;
	if(typeof(username) == "undefined" || typeof(password) == undefined){
		console.log("directed request the index without user cookies info!");
		res.render('login');
	}
	else
  		res.render('index');
});











module.exports = router;
