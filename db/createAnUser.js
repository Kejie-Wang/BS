/*!
*Message
*@brief This is the mysql interface used to create a user
*		It will check whether the parameters is legal or not
*		The username, password and mailbox must not be empty
*		The username must not exit and the password length must not shorter the six
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/

var MINPASSWDLENGTH = 6; //the minimun length of the password

query = require("./connPool");

/*@brief Check whehter the user name is legal
*	check whether the user name is empty
*	check whether the user name exits or not
*@param userName The checked username
*/
function userNameCheck(userName){
	if(typeof(userName) == 'undefined' || userName == null){
		throw new Error("The username can not be empty!");
	}
	var userSelectSql = "SELECT * FROM User WHERE username='" + userName + "';";
	query(userSelectSql, function(res){
		if(res.length != 0){	//this user name not exit
			throw new Error("This username already exits!");
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
exports.CreateAnUser = function(userInfo, callback){

	var userName = userInfo['userName'];
	var password = userInfo['password'];
	var mailbox = userInfo['mailbox'];
	var state = 0;
	var gender = userInfo['gender'];
	var birthday = userInfo['birthday'];
	var address = userInfo['phoneNumber'];
	var realName = userInfo['realName'];

	try{
		userNameCheck(userName);
		passwordCheck(password);
		mailboxCheck(mailbox);
		var insertSql = "INSERT INTO User VALUES ("
			+ "\'" + userName + "\', "
			+ "\'" + password + "\', "
			+ "\'" + mailbox + "\', "
			+ "\'" + state + "\', ";

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

		if(typeof(realName) == 'undefined' || realName == null)
			insertSql += "null, ";
		else
			insertSql += ("\'" + realName + "\', ");

		insertSql += ("now());")

		query(insertSql, callback);

	}catch(err){
		callback(err, null);
	}
}
