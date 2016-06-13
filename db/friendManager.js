/*!
*Message
*@brief This is the mysql interface used to manage the friend table
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/

client = require("./connPool");

exports.buildAFriend(var friendName1, var friendName2, var friendList1, var friendList2, callback){
	var insertSql = "INSERT INTO Friend VALUES("
					+"\'" + friendName1 + "\',"
					+"\'" + friendName2 + "\',"
					+"\'" + friendList1 + "\',"
					+"\'" + friendList2 + "\',"
					+"now());";
	client(insertSql, callback);
}

exports.deleteAFriend(var friendName1, var friendName2, callback){
	var deleteSql = "DELETE FROM Friend WHERE"
				+ "friendName1=" + "\'" + friendName1 + "\' AND "
				+ "friendName2=" + "\'" + friendName2 + "\'"
}
