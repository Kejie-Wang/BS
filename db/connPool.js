/*!
*Message
*@brief This is the mysql interface used to get a connnection and execeute a sql expression
*@author Jack<wang_kejie@foxmail.com>
*@copyright(c) 2016 Jack
*/
var USER = "MessageAdmin";
var PASSWORD = "123456";
var DATABASE = "Message";
var PORT = 3306;

var mysql = require("mysql");

var pool = mysql.createPool({
    host: 'localhost',
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
});

/*@brief This is the mysql interface used to query the database
*@param sql The executed sql
*@param callback The callback function
*		It should contain two params err and result
*		The param err is the query generate
*		The param result is the query result
*/
function query(sql, callback) {
    console.log(sql);
    pool.getConnection(function (err, conn) {
        if (err) {
			console.log("Get connection error");
			return callback(err, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                if (qerr){
                    console.log("Execute sql '" + sql + "' error");
					callback(qerr, null);
				}
                conn.release();
                callback(null, vals);
            });
        }
    });
}

modules.exports = query;
