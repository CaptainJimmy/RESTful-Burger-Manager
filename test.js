var mysql = require('mysql');
var DBPASSWORD = process.env.DBPASSWORD;
var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: DBPASSWORD,
            database: 'burgers_db'
});
console.log(DBPASSWORD);
connection.connect( (err) => {
if (err) throw err;
console.log(connection.threadId);

 connection.query("SELECT * FROM ready",(error,results) => {
if (error) throw error;
console.log(results);
connection.end();
});
});

