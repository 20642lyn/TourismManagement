var mysql = require('mysql');
var db = mysql.createConnection({

   host:'localhost',
   user:'root',
   password:'123456',
   database:'travelsql'

});

db.connect();

module.exports = db;