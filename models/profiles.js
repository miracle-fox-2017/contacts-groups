const sqlite3 = require('sqlite3').verbose();

class ProfilesModel {
	constructor(file) {
		this.tablename = 'Profile';
		this.file = file;
	}

	getAllData(callback) {
		let db = new sqlite3.Database(this.file);
		let query = `SELECT * FROM ${this.tablename}`;
		db.all(query, (err, rows) => {
			if (err) {
				throw err;
			} 
			callback(rows);
		})

		db.close();
	}

	tamkbahData(data) {
		let db = new sqlite3.Database(this.file);
		let query = `INSERT INTO ${this.tablename} (username, password, contacts_id) VALUES ("${data.username}", "${data.password}", ${+data.contacts_id})`;
		db.run(query);
		db.close();
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.file);
		let query = `UPDATE ${this.tablename} SET username = "${data.edited.username}", password = "${data.edited.password}" WHERE id = ${data.id}`;
		db.run(query);
		db.close();
	}

	hapusDataById(data) {
		let db = new sqlite3.Database(this.file);
		let query = `DELETE FROM ${this.tablename} WHERE id = ${data.id}`;
		db.run(query);
		db.close();
	}

	getById(data, callback) {
		let db = new sqlite3.Database(this.file);
		let query = `SELECT * FROM ${this.tablename} WHERE id = ${data.id}`;
		db.get(query, (err, rows) =>{
			if (err) {
				throw err;
			} 
			callback(rows);
		});
		
		db.close();
	}
}

module.exports = ProfilesModel;