var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'566456789',
    database:'cms'
});
db.connect();
module.exports = db;