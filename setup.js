const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) throw err;
});
 
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    telp_number VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(255)
  )`, err => {
    if (err) throw err;
  });

  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(30) NOT NULL
  )`, err => {
    if (err) throw err;
  });

  db.run(`CREATE TABLE IF NOT EXISTS Profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
  )`, err => {
    if (err) throw err;
  });

  db.run(`CREATE TABLE IF NOT EXISTS Addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    zipcode VARCHAR(30)
  )`, err => {
    if (err) throw err;
  });
});
 
db.close();