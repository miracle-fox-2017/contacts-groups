const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

db.serialize(function() {
  db.run(`CREATE TABLE if not exists contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    company VARCHAR(50),
    telp VARCHAR(12),
    email VARCHAR(50))`);

  db.run(`CREATE TABLE IF NOT EXISTS groups(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(50))`)

  db.run(`CREATE TABLE IF NOT EXISTS profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL)`)

  db.run(`CREATE TABLE IF NOT EXISTS address(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(50),
    city VARCHAR(20),
    zipcode INTEGER)`)
});

db.close();
