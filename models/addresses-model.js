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
		})

		db.close();
	}

	getAllDataInnerJoin(tableSource, callback) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `select ${this.tablename}.id, ${this.tablename}.street, ${this.tablename}.city, ${this.tablename}.zipcode , ${this.tablename}.contacts_id, ${tableSource}.name, ${tableSource}.company
					from ${this.tablename}
					inner join ${tableSource} ON ${this.tablename}.contacts_id =  ${tableSource}.id`;
		db.all(sql, (err, rows) => {
			if (err) {
				throw err;
			} 

			callback(rows);
		})

		db.close();
	}

	addData(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `INSERT INTO ${this.tablename} (street, city, zipcode, contacts_id) VALUES ("${data.street}", "${data.city}", ${+data.zipcode}, ${+data.contacts_id})`;
		db.run(sql);
		db.close();
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `UPDATE ${this.tablename} SET street = "${data.editItem.street}", city = "${data.editItem.city}", zipcode = ${+data.editItem.zipcode}, contacts_id = ${+data.editItem.contacts_id} WHERE id = ${data.id}`;
		console.log(sql);
		db.run(sql);
		db.close();
	}

	deleteDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `DELETE FROM ${this.tablename} WHERE id = ${data.id}`;
		db.run(sql);
		db.close();
	}

	getById(data, callback) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `SELECT * FROM ${this.tablename} WHERE id = ${data.id}`;
		db.get(sql, (err, rows) =>{
			if (err) {
				throw err;
			} 

			callback(rows);
		});
		db.close();
	}
}

module.exports = AddressesModel;