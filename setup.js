const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,  name VARCHAR(25), company VARCHAR(25), telp_number VARCHAR(25), email VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,  name_of_group VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT,  username VARCHAR(25), password VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,  street VARCHAR(25), city VARCHAR(25), zipcode INTEGER)');

	// Modif dari original
	db.run(`ALTER TABLE Profile ADD contacts_id INTEGER FOREIGNKEY`, (err) => {
		console.log(err);
	});
	// db.run(`ALTER TABLE Profile ADD CONSTRAINT contacts_id UNIQUE (contacts_id)`);
});

db.close();