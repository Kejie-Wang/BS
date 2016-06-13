/*!
*Message
*@brief This is the mysql interface userd to manage the message table in the mysql
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/

client = require("./connPool");

/*@brief This is the mysql interface used to insert a message into the database
*@param from The user name where this message from, it is the foreign key of the user table
*@param to   The user name where this message goes to, it is the foreign key of the user table
*@param content The content of this message whose length is no more than 200
*@param callback The callback function which contains two params err and vals
*				err: The error message if there is any error message
*				vals:The result the insert return
*/
exports.insertAMessage = function (from, to, content, state, callback) {
	var stateVal = (state==0) ? 0 : 1;
	var insertSql = "INSERT INTO Message VALUES("
					+ "\'" + from + "\', "
					+ "\'" + to + "\', "
					+ "\'" + content + "\', "
					+ stateVal +
					+ "now());"

 	client.query(insertSql, callback);
}

/*@brief This is the mysql interface used to set the send state of a list message
*		 It used to update the message state sent when a user login and the system push the message to the user
*@param from The user name where this message from, it is the foreign key of the user table
*@param to   The user name where this message goes to, it is the foreign key of the user table
*@param callback The callback function which contains two params err and vals
*				err: The error message if there is any error message
*				vals:The result the insert return
*/
exports.setState = function(from, to, callback){
	var updateSql = "UPDATE Message SET isSend = 1 WHERE "
					+ "messageFrom=" + "\'" + from + "\' AND "
					+ "messageTo="   + "\'" + to   + "\';"

	client.query(updateSql, callback);
}


/*@brief This is the mysql interface used to get the message unsent
		 It used to when the system pushes the message to the user
*@param from The user name where this message from, it is the foreign key of the user table
*@param to   The user name where this message goes to, it is the foreign key of the user table
*@param callback The callback function which contains two params err and vals
*				err: The error message if there is any error message
*				vals:The result the insert return
*/
exports.getUnsendMessage = function(from, to, centent, callback){
	var selectSql = "SELECT messageContent, sendTime FROM Message WHERE "
					+ "messageFrom=" + "\'" + from + "\' AND "
					+ "messageTo="   + "\'" + to   + "\' AND "
					+ "isSend=0 ORDER BY sendTime;";
	client.query(selectSql, callback);
}
/*@breif This is the mysql interface used to get the message sent
*/
exports.getSendMessage = function(from, to, centent, callback){
	var selectSql = "SELECT messageContent, sendTime FROM Message WHERE "
					+ "messageFrom=" + "\'" + from + "\' AND "
					+ "messageTo="   + "\'" + to   + "\' AND "
					+ "isSend=1; ORDER BY sendTime;";
	client.query(selectSql, callback);
}
