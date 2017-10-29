var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/tabel.db');
module.exports = db

//setup
// var db2 = new sqlite3.Database('../db/tabel.db');
// module.exports = db2

