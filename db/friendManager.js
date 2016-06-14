/*!
*Message
*@brief This is the mysql interface used to manage the friend table
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/

client = require("./connPool");

exports.buildAFriend = function(friendName1, friendName2, friendList1, friendList2, callback){
	friendList1 = friendName1 + friendList1;
	friendList2 = friendName2 + friendList2;
	if(friendName2 < friendName1){
		var tmp;
		tmp = friendName1;
		friendName1 = friendName2;
		friendName2 = tmp;
		tmp = friendList1;
		friendList1 = friendList2;
		friendList2 = tmp;
	}

	var insertSql = "INSERT INTO Friend VALUES("
					+"\'" + friendName1 + "\',"
					+"\'" + friendName2 + "\',"
					+"\'" + friendList1 + "\',"
					+"\'" + friendList2 + "\',"
					+"now());";
	console.log(insertSql);
	client.query(insertSql, (err, vals)=>{
		if(err){
			callback(err, null);
		}
		var insertSql = "INSERT INTO Friend VALUES("
						+"\'" + friendName2 + "\',"
						+"\'" + friendName1 + "\',"
						+"\'" + friendList2 + "\',"
						+"\'" + friendList1 + "\',"
						+"now());";
		client.query(insertSql, callback);
	});
}

exports.deleteAFriend = function(friendName1, friendName2, callback){
	if(friendName2 < friendName1){
		var tmp;
		tmp = friendName1;
		friendName1 = friendName2;
		friendName2 = tmp;
	}

	var deleteSql = "DELETE FROM Friend WHERE"
				+ "friendName1=" + "\'" + friendName1 + "\' AND "
				+ "friendName2=" + "\'" + friendName2 + "\'"
}

exports.checkIsAFriend = function(friendName1, friendName1, callback){
	if(friendName2 < friendName1){
		var tmp;
		tmp = friendName1;
		friendName1 = friendName2;
		friendName2 = tmp;
	}

	var selectSql = "SELECT * FROM Friend WHERE "
					+ "friendName1=\'" + friendName1 + "\' AND "
				 	+ "friendName1=\'" + friendName2 + "\';"

	client.query(selectSql, callback);
}

exports.getAllFriend = function(userName, callback){
	var selectSql = "SELECT friendName1, friendList2, avatar "
					+ "FROM (Friend JOIN User ON friendName1 = userName)"
					+ "WHERE friendName2 = \'" + userName + "\';";

	client.query(selectSql, callback);
}
