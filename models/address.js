const sqlite3 = require('sqlite3').verbose();

class AddressesModel {
	constructor(file) {
		this.tablename = 'Addresses';
		this.file = file;
	}

	getAllData(callback) {
		let db = new sqlite3.Database(this.file);
		let sql = `SELECT * FROM ${this.tablename}`;
		db.all(sql, (err, rows) => {
			if (err) {
				throw err;
			} 

			callback(rows);
			db.close();
		})
	}

	tambahData(data) {
		let db = new sqlite3.Database(this.file);
		let query = `INSERT INTO ${this.tablename} (street, city, zipcode) VALUES ("${data.street}", "${data.city}", ${+data.zipcode})`;
		db.run(query);
		db.close();
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.file);
		let query = `UPDATE ${this.tablename} SET street = "${data.edited.street}", city = "${data.edited.city}", zipcode = ${+data.editItem.zipcode} WHERE id = ${data.id}`;
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
			db.close();
		});
	}
}

module.exports = AddressesModel;