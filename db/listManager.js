/*!
*Message
*@brief This is the mysql interface used to manage the list table in the mysql database\
*@fucntion
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/
var LISTIDLENGTH = 50;

exports.getAllList = function(userName, callback){
	var selectSql = "SELECT listName, userName FROM List WHERE userName=\'" + userName + "\';";
	console.log("In get all list, sql=", selectSql);
	client.query(selectSql, callback);
}

exports.addAList= function(userName, listName, callback){
	var newID = userName + listName;
	var insertSql = "INSERT INTO LIST VALUES("
		+ "\'" + newID + "\', "
		+ "\'" + listName + "\', "
		+ "\'" + userName + "\');";
	console.log(insertSql);
	client.query(insertSql, (err, res)=>{
		callback(err, res);
	});
}

exports.deleteAList = function(username, listName, callback){
	var deleteSql = "DELETE FROM List WHERE "
					+"listName=\'" + listName + "\' AND"
					+"userName=\'" + username + "\';";

	client.query(deleteSql, callback);
}
