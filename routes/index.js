var express = require('express');
var router = express.Router();

var userManager = require("../db/userManager");
var listMagager = require("../db/listManager");
var messageMagager = require("../db/messageManager");
var friendManager = require("../db/friendManager");

// var cookie = require('cookie');
/* GET home page. */
router.get('/', function(req, res, next){
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
		if(err){
			console.log(err);
		}
		listMagager.addAList(req.body.userName, "MyFriend", (err, vals)=>{
			if(err){
				console.log(err);
			};
			var msg={
				success:true,
				err: "",
				url:"/login"
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
		{
			userManager.setSateVal(userName, 1, (err, vals)=>{
				if(err){
					console.log(err);
				}
				res.send({'success': true, 'url': '/index'});
			});
		}
	});
});

router.get('/auth/logout', function(req, res, next){
	res.clearCookie('userName');
	res.clearCookie('password');
	res.send({});
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
		res.send({'userName': userName, 'avatar': vals[0].avatar});
	});
});

router.get('/getAllList', function(req, res, next){
	var userName = req.cookies.userName;
	console.log(userName);
	listMagager.getAllList(userName, (err, vals)=>{
		if(err){
			console.log(err);
		}
		res.send({"results": vals});
	});
});

router.get('/getFriendInfo', function(req, res, next){
	var userName = req.cookies.userName;
	friendManager.getAllFriend(userName, (err, vals)=>{
		if(err){
			console.log(err);
		}
		res.send({"results": vals});
	});
});

router.post('/userSearch', function(req, res, next){
	var userName = req.body.userName;
	console.log("In userSearch post userName = ", userName);
	userManager.userSearch(userName, (err, vals)=>{
		if(err){
			console.log(err);
		}
		if(vals.length > 0)
			res.send({"user": vals[0]});
		else{
			res.send({"user": null});
		}
	});
});

router.get('/checkIsAFriend', function(req, res, next){
	var userName1 = req.body.userName1;
	var userName2 = req.body.userName2;

	friendManager.checkIsAFriend(userName1, userName2, (err, vals)=>{
		if(err){
			console.log(err);
		}
		if(vals.length > 0)
			res.send({"isFriend": true});
		else{
			res.send({"isFriend": false});
		}
	})
});

router.post('/requestAddAFriend', function(req, res, next){
	var from = req.cookies.userName;
	var to = req.body.userName;
	var info = req.body.info;
	console.log(req.body, "from", from, "to", to, "info", info);
	var listName1="MyFriend", listName2="MyFriend";
	friendManager.buildAFriend(from, to, listName1, listName2, (err, vals)=>{
		if(err){
			console.log(err);
		}
		console.log("bbbbbbbbbbbbb");
		res.send({});
	});
});

// router.get('/addAFriend', function(req, res, next){
// 	var userName1 = req.body.userName1;
// 	var userName2 = req.body.userName2;
// 	var listName1 = req.body.listName1;
// 	var listName2 = req.body.listName2;
// 	if(typeof(listName1) == undefined){
// 		listName1 = "MyFriend";
// 	}
// 	if(typeof(listName2) == undefined){
// 		listName2 = "MyFriend";
// 	}
// 	friendManager.buildAFriend(userName1, userName2, listName1, listName2, (err, vals)=>{
// 		if(err){
// 			console.log(err);
// 		}
// 		res.send({});
// 	});
// });

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
