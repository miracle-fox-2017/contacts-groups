const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,  name VARCHAR(25), company VARCHAR(25), telp_number VARCHAR(25), email VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,  name_of_group VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT,  username VARCHAR(25), password VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,  street VARCHAR(25), city VARCHAR(25), zipcode INTEGER)');

	// Modif dari original Profile untuk tambah contacts_id unique FK
	db.run(`CREATE TABLE IF NOT EXISTS Profile_temp (
		id	INTEGER PRIMARY KEY AUTOINCREMENT,
		username	INTEGER,
		password	INTEGER,
		contacts_id	INTEGER UNIQUE,
		FOREIGN KEY (contacts_id) REFERENCES Contacts(id)
	)`);

	db.run(`INSERT INTO Profile_temp (id, username, password) SELECT * FROM Profile`);
	db.run(`DROP TABLE Profile`);
	db.run(`ALTER TABLE Profile_temp RENAME TO Profile`);
});

db.close();