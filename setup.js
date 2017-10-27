var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS
    Contacts  (id INTEGER PRIMARY KEY AUTOINCREMENT,
              name VARCHAR,
              company VARCHAR,
              telp_number VARCHAR,
              email VARCHAR)`);
  
  db.run(`CREATE TABLE IF NOT EXISTS
      Groups  (id INTEGER PRIMARY KEY AUTOINCREMENT,
              name_of_group VARCHAR)`);

  db.run(`CREATE TABLE IF NOT EXISTS
      Profile (id INTEGER PRIMARY KEY AUTOINCREMENT,
              username VARCHAR,
              password VARCHAR)`);

  db.run(`CREATE TABLE IF NOT EXISTS
      Adresses  (id INTEGER PRIMARY KEY AUTOINCREMENT,
                street VARCHAR,
                city VARCHAR,
                zipcode INTEGER)`);

});
 
db.close();