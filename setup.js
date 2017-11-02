const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


// release 0 membuat file setup.js
db.serialize(function(){
	db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(20), company TEXT, telp_number varchar(20) , email varchar(50) )");
	db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group varchar(20) )");
	db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(20), password vachar(20))");
	db.run("CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street varchar(30), city varchar(10), zipcode INTEGER)");
	db.run(`ALTER TABLE Profile ADD COLUMN contacts_id INTEGER REFERENCES Contacts (id)`)
	db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idContact ON Profile (contacts_id)`)
	db.run(`ALTER TABLE Addresses add COLUMN contacts_id INTEGER REFERENCES Contacts (id)`)
  })
  
  db.close()


