const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize( () => {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(25),
          company VARCHAR(30),
          telp VARCHAR(20),
          email VARCHAR(30))`);

  db.run(`CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name_of_group VARCHAR(30))`);

  db.run(`CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(20),
          password VARCHAR(20))`);

  db.run(`CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT,
          street VARCHAR(150),
          city VARCHAR(30),
          zipcode INTEGER)`);

  // db.run(`ALTER TABLE Profiles ADD COLUMN Contacts_id INTEGER REFERENCES Contacts(id)`)
  db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idContacts ON profiles(Contacts_id)`)

});
  db.close();
