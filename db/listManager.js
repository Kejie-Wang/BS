/*!
*Message
*@brief This is the mysql interface used to manage the list table in the mysql database\
*@fucntion 
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/
var LISTIDLENGTH = 50;

exports.addAList(username, listname, callback){
	var selectSql = "SELECT MAX(listID) FROM List";
	client.query(selectSql, (err, res)=>{
		if(err){
			callback(err, null);
		}
		else {
			var maxID = res[0]["MAX(listID)"];
			var newID=0;
			if(maxID!=null && typeof(maxID)!="undefined"){
				newID = Number(maxID) + 1;
			}
			while(newID.length < LISTIDLENGTH)
				newID = '0' + newID;
			var insertSql = "INSERT INTO LIST VALUES("
				+ "\'" + newID + "\', "
				+ "\'" + listname + "\', "
				+ "\'" + username + "\');";
			client.query(insertSql, (err, res)=>{
				callback(err, res);
			});
		}
	});
}

exports.deleteAList(username, listname, callback){
	var deleteSql = "DELETE FROM List WHERE "
					+"listName=\'" + listname + "\' AND"
					+"userName=\'" + username + "\';";

	client.query(deleteSql, callback);
}
