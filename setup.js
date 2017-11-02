var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40), company VARCHAR(40), telp VARCHAR(15), email VARCHAR(40))`);

  db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(30))`)

  db.run(`CREATE TABLE IF NOT EXISTS Profile(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50), password VARCHAR(20))`)

  db.run(`CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(40), city VARCHAR(20), zipcode INTEGER)`)

  // db.run(`ALTER TABLE Profile ADD COLUMN Contacts_id INTEGER REFERENCES Contacts(id)`)

  //  db.run(`ALTER TABLE Addresses ADD COLUMN contacts_id INTEGER REFERENCES Contacts(id)`)

  // db.run(`CREATE UNIQUE INDEX IF NOT EXISTS kontakAlamat_unik ON Profile(Contacts_id) `)

});
db.close();
