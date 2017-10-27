const sqlite3 = require('sqlite3').verbose();

class AddressesModel {
	constructor(dbFile) {
		this.tablename = 'Addresses';
		this.dbFile = dbFile;
	}

	getAllData(callback) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `SELECT * FROM ${this.tablename}`;
		db.all(sql, (err, rows) => {
			if (err) {
				throw err;
			} 

			callback(rows);
			db.close();
		})
	}

	addData(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `INSERT INTO ${this.tablename} (street, city, zipcode) VALUES ("${data.street}", "${data.city}", ${+data.zipcode})`;
		db.run(sql);
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `UPDATE ${this.tablename} SET street = "${data.editItem.street}", city = "${data.editItem.city}", zipcode = ${+data.editItem.zipcode} WHERE id = ${data.id}`;
		db.run(sql);
	}

	deleteDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `DELETE FROM ${this.tablename} WHERE id = ${data.id}`;
		db.run(sql);
	}

	getById(data, callback) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `SELECT * FROM ${this.tablename} WHERE id = ${data.id}`;
		db.get(sql, (err, rows) =>{
			if (err) {
				throw err;
			} 

			callback(rows);
			db.close();
		});
	}
}

module.exports = AddressesModel;