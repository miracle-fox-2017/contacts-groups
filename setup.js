const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,  name VARCHAR(25), company VARCHAR(25), telp_number VARCHAR(25), email VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,  name_of_group VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT,  username VARCHAR(25), password VARCHAR(25))');

	db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,  street VARCHAR(25), city VARCHAR(25), zipcode INTEGER)');

	// RILIS 3: Modif dari original Profile untuk tambah contacts_id unique FK
	// Comment script ini tiap ganti table property dirilis berikutnya agar tidak dijalankan karena datanya sudah terbaru
	// dan tidak perlu tambah kolom lagi
	/*db.run(`CREATE TABLE IF NOT EXISTS Profile_temp (
		id	INTEGER PRIMARY KEY AUTOINCREMENT,
		username	VARCHAR(25),
		password	VARCHAR(25),
		contacts_id	INTEGER UNIQUE,
		FOREIGN KEY (contacts_id) REFERENCES Contacts(id)
	)`);

	db.run(`INSERT INTO Profile_temp (id, username, password) SELECT * FROM Profile`);
	db.run(`DROP TABLE Profile`);
	db.run(`ALTER TABLE Profile_temp RENAME TO Profile`);*/

	// Rilis 6
	// Comment script ini tiap ganti table property dirilis berikutnya agar tidak dijalankan karena datanya sudah terbaru
	// dan tidak perlu tambah kolom lagi
	/*db.run(`CREATE TABLE IF NOT EXISTS Addresses_temp (
		id	INTEGER PRIMARY KEY AUTOINCREMENT,
		street	VARCHAR(25),
		city	VARCHAR(25),
		zipcode	INTEGER,
		contacts_id	INTEGER,
		FOREIGN KEY (contacts_id) REFERENCES Contacts(id)
	)`);

	db.run(`INSERT INTO Addresses_temp (id, street, city, zipcode) SELECT * FROM Addresses`);
	db.run(`DROP TABLE Addresses`);
	db.run(`ALTER TABLE Addresses_temp RENAME TO Addresses`);*/

	db.run(`CREATE TABLE Contacts_Groups (
		id	INTEGER PRIMARY KEY AUTOINCREMENT,
		contacts_id	INTEGER,
		groups_id	INTEGER,
		FOREIGN KEY (contacts_id) REFERENCES Contacts(id),
		FOREIGN KEY (groups_id) REFERENCES Groups(id)
	);`);
});

db.close();