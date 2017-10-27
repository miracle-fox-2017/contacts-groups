const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(function() {
  db.run(`CREATE TABLE if not exists contacts (id INTEGER AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, company VARCHAR(50), telp_number VARCHAR(12), email VARCHAR(50))`);

  db.run(`CREATE TABLE IF NOT EXISTS groups(id INTEGER AUTO_INCREMENT PRIMARY KEY, name_of_group VARCHAR(50))`)

  db.run(`CREATE TABLE IF NOT EXISTS profile(id INTEGER AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL)`)

  db.run(`CREATE TABLE IF NOT EXISTS address(id INTEGER AUTO_INCREMENT PRIMARY KEY, street VARCHAR(50), city VARCHAR(20), zipcode INTEGER)`)
});

db.close();
