var express = require('express');
var router = express.Router();

var userManager = require("../db/userManager");
var listMagager = require("../db/listManager");
var messageMagager = require("../db/messageManager");

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

router.post('/auth/register', function(req, res, next){
	console.log("req.body", req.body);
	userManager.createAnUser(req.body, (err, vals)=>{
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
	var userName = req.body.userName;
	var password = req.body.password;
	res.cookie("userName", userName);	//write the cookies
	res.cookie("password", password);
	auth.signInAuth(userName, password, (users)=>{
		console.log(users);
		if(users.length == 0)
			res.send({'success': false});
		else
			res.send({'success': true, 'url': '/index'});
	});
});

router.get('/index', function(req, res, next){
	console.log(req.cookies);
	var userName = req.cookies.userName;
	var password = req.cookies.password;
	if(typeof(userName) == "undefined" || typeof(password) == undefined){
		console.log("directed request the index without user cookies info!");
		res.render('login');
	}
	else
  		res.render('index');
});

router.get('/getUserInfo', function(req, res, next){
	console.log(req.cookies);
	var userName = req.cookies.userName;

	userManager.getAvartar(userName, (err, vals)=>{
		if(err){
			console.log(err);
		}
		res.send({'userName': userName, "avatar": vals["avatar"]});
	});
});

router.get('/userSearch', function(req, res, next){
	var userName = req.body.userName;

	userManager.userSearch(userName, (err, vals)=>{
		if(err){
			console.log(err);
		}
		res.send({"userName": vals});
	});
});

router.get('/checkIsAFriend', function(req, res, next)={
	var userName1 = req.body.userName1;
	var userName2 = req.body.userName2;

	friendManager.checkIsAFriend(userName1, userName2, (err, vals)={
		if(err){
			console.log(err);
		}
		if(vals.length > 0)
			res.send({"isFrined": true});
		else{
			res.send({"isFriend": false});
		}
	})
});

router.get('/addAFriend', function(req, res, next){
	var userName1 = req.body.userName1;
	var userName2 = req.body.userName2;
	var listName1 = req.body.listName1;
	var listName2 = req.body.listName2;
	if(typeof(listName1) == undefined){
		listName1 = "MyFriend";
	}
	if(typeof(listName2) == undefined){
		listName2 = "MyFriend";
	}
	friendManager.buildAFriend(userName1, userName2, listName1, listName2, (err, vals)=>{
		if(err){
			console.log(err);
		}
		res.send({});
	});
});

router.get('/deleteAFriend', function(req, res, next){
	var userName1 = req.body.userName1;
	var userName2 = req.body.userName2;

	friendManager.deleteAFriend(userName1, userName2, (err, vals)=>{
		if(err){
			console.log(err);
		}
		res.send({});
	});

})



















module.exports = router;
