/*!
*Message
*@brief This is the mysql interface used to manage the user tbale in the mysql
*@function createAnUser Create an user by the provided user inf0
*		It will check whether the parameters is legal or not
*		The userName, password and mailbox must not be empty
*		The userName must not exit and the password length must not shorter the six
*@function setSateVal: Set the user state online or offline
*@function updateUserInfo: Update the user infomation
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/

var MINPASSWDLENGTH = 6; //the minimun length of the password

client = require("./connPool");

/*@brief Check whehter the user name is legal
*	check whether the user name is empty
*	check whether the user name exits or not
*@param userName The checked userName
*/
function userNameCheck(userName){
	if(typeof(userName) == 'undefined' || userName == null){
		throw new Error("The userName can not be empty!");
	}
	var userSelectSql = "SELECT * FROM User WHERE userName='" + userName + "';";
	console.log(userSelectSql);
	client.query(userSelectSql, (err, res)=>{
		if(err){
			throw err;
		}
		if(res.length != 0){	//this user name not exit
			throw new Error("This userName already exits!");
		}
	});
}

/*@brief Check whehter the password is legal
*	check whether the password is empty
*	check whether the length of the password is shorter than six
*@param password The checked password
*/
function passwordCheck(password){
	if(typeof(password) == 'undefined' || password == null){
		throw new Error("The password can not be empty!");
	}
	if(password.lenth < 6){
		throw new Error("The password length is shorter than six");
	}
}

/*@brief Check whehter the email is legal using a regular expression
*@param mailbox The checked email address
*/
function isEmail(str){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	return reg.test(str);
}
function mailboxCheck(mailbox){
	if(typeof(mailbox) == 'undefined' || mailbox == null){
		throw new Error("The mailbox can not be empty!");
	}
	if(!isEmail(mailbox)){
		throw new Error("The email is not a legal email format");
	}
}

/*@brief The interface used to create an user
*@param userInfo The data structure contains the inserted user info
*		which is dict map the the field to the value
*		field:	userName, password,  mailbox, gender, birthday, phoneNumber, realName
*		The userName, password, mailbox can not be empty, the other are optional
*		The length of the password can not shorter than six
*		The mailbox format should conform to the email box format
*@param callback The callback function which contain two parameters err, vals
*		err: The error Message
*		vals: The return values
*/
exports.createAnUser = function(userInfo, callback){
	console.log("userInfo", userInfo);
	var userName = userInfo['userName'];
	var password = userInfo['password'];
	var avatar = "/avatar/default.png"
	var mailbox = userInfo['email'];
	var state = 0;
	var gender = userInfo['gender'];
	var birthday = userInfo['birthday'];
	var phoneNumber = userInfo['phoneNumber'];
	var address = userInfo['address'];
	var realName = userInfo['realName'];

	try{
		userNameCheck(userName);
		passwordCheck(password);
		mailboxCheck(mailbox);
		var insertSql = "INSERT INTO User VALUES ("
			+ "\'" + userName + "\', "
			+ "\'" + password + "\', "
			+ "\'" + avatar   + "\', "
			+ "\'" + mailbox + "\', "
			+ state + ", ";

		if(typeof(gender) == 'undefined' || gender == null)
			insertSql += "null, ";
		else
			insertSql += ("\'" + gender + "\', ");

		//TODO: birthday is an date
		if(typeof(birthday) == 'undefined' || birthday == null)
			insertSql += "null, ";
		else
			insertSql += ("\'" + birthday + "\', ");

		if(typeof(address) == 'undefined' || address == null)
			insertSql += "null, ";
		else
			insertSql += ("\'" + address + "\', ");

		if(typeof(phoneNumber) == 'undefined' || phoneNumber == null)
			insertSql += "null, ";
		else
			insertSql += ("\'" + phoneNumber + "\', ");

		if(typeof(realName) == 'undefined' || realName == null)
			insertSql += "null, ";
		else
			insertSql += ("\'" + realName + "\', ");

		insertSql += ("now());")
		client.query(insertSql, callback);
	}catch(err){
		callback(err, null);
	}
}

/*@brief The interface used to check the user is online or offline
*@params userName The checked user name
*/
exports.getState = function (userName) {
	var sql = "SELECT * FROM User WHERE userName=\'" + userName + "\';";
	client.query(sql, (err, vals)=>{
		if(vals['state'] == 1){
			return true;
		}
		return false;
	});
}

/*@brief The interface used to set the user state: oneline or offline
*@param userName: The user name you set
*@param stete: The set state 0->offline 1->online
*/
exports.setSateVal = function(userName, state, callback){
	var val = state ? 1 : 0;
	var sql = "UPDATE User SET state=" + val + " WHERE userName=\'" + userName + "\';"
	client.query(sql, callback);
}

exports.getAvartar = function(userName, callback){
	var sql = "SELECT avatar FROM User;";

	client.query(sql, callback);
}

exports.userSearch = function(userName, callback){
	var sql = "SELECT userName FROM User WHERE userName LIKE \'%" + userName + "%\';";

	client.query(sql. callback);
}
























//
