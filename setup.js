const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize( () => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(20),
            company VARCHAR(30),
            telp VARCHAR(15),
            email VARCHAR(30))`);

  db.run(`CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(25))`);
  db.run(`CREATE TABLE IF NOT EXISTS profiles(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(15), password VARCHAR(20))`);
  db.run(`CREATE TABLE IF NOT EXISTS addresses(id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(80), city VARCHAR(20), zipcode INTEGER)`);
});
  db.close();
