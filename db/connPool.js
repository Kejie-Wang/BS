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

function query(sql, callback) {
    console.log(sql);
    pool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                if (err)
                    throw err;
                conn.release();
                try {
                    callback(vals);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }
    });
}

modules.exports = query;
