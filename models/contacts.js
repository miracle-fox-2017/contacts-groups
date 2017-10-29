const sqlite3 = require('sqlite3').verbose();

class ContactsModel {
	constructor(file) {
		this.tablename = 'Contacts';
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
			db.close();
		})
	}

	tambahData(data) {
		let db = new sqlite3.Database(this.file);
		let query = `INSERT INTO ${this.tablename} (name, company, telp_number, email) VALUES ("${data.name}", "${data.company}", "${data.telp_number}", "${data.email}")`;
		db.run(query);
	}

	updateDataByID(data) {
		let db = new sqlite3.Database(this.file);
		let query = `UPDATE ${this.tablename} SET name = "${data.edited.name}", company = "${data.edited.company}", telp_number = "${data.edited.telp_number}", email = "${data.edited.email}" WHERE id = ${data.id}`;
		db.run(query);
	}

	hapusDataByID(data) {
		let db = new sqlite3.Database(this.file);
		let query = `DELETE FROM ${this.tablename} WHERE id = ${data.id}`;
		db.run(query);
	}

	getById(data, callback) {
		let db = new sqlite3.Database(this.file);
		let query = `SELECT * FROM ${this.tablename} WHERE id = ${data.id}`;
		db.get(query, (err, rows) =>{
			if (err) {
				throw err;
			} 

			callback(rows);
			db.close();
		});
	}
}

module.exports = ContactsModel;