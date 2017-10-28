const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(function(){

    db.run(`CREATE TABLE IF NOT EXISTS contact(
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	name	varchar(50),
	company	varchar(50),
	telp_number	varchar(50),
	email	varchar(20))`);

    db.run(`CREATE TABLE IF NOT EXISTS groups(
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	name_of_group	varchar(50))`);

    db.run(`CREATE TABLE IF NOT EXISTS profile(
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	username	varchar(50),
	password	varchar(50))`);

    db.run(`CREATE TABLE IF NOT EXISTS address(
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	street	varchar(50),
	city	varchar(50),
	zipcode	varchar(50))`);

});

db.close();