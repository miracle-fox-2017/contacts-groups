const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Addresses';

class AddressesModel {
	constructor() {

	}

	/* Method pengganti addData(data) */
	static create(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `INSERT INTO ${tableName} (street, city, zipcode, contacts_id) VALUES ("${data.street}", "${data.city}", ${+data.zipcode}, ${+data.contacts_id})`;

		db.run(sql, function(err, rows) {
			if (err) {
				console.error(err);
				callback(err, null, null);
			} else {
				callback(null, rows, this.lastID);
			}
		});

		db.close();
	}

	/* Method pengganti getAllData(callback) */
	static findAll(callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `SELECT * FROM ${tableName}`;
		db.all(sql, function(err, rows) {
			if (err) {
				console.error(err);
				callback({err: err, message: 'Something wrong with sql query!'}, null);
			} else {
				callback(null, rows);
			}
		})

		db.close();
	}

	/* Method pengganti getById(data, callback) */
	static findById(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `SELECT * FROM ${tableName} WHERE id = ${data.id}`;
		db.get(sql, (err, rows) =>{
			if (err) {
				console.error(err);
				callback(err, null);
			} else {
				callback(null, rows);
			}
		});

		db.close();
	}

	/* Method pengganti getAllDataInnerJoin(tableSource, callback) */
	static findAllDataInnerJoin(tableSource = 'Contacts', callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `select ${tableName}.id, ${tableName}.street, ${tableName}.city, ${tableName}.zipcode , ${tableName}.contacts_id, ${tableSource}.name, ${tableSource}.company
					from ${tableName}
					inner join ${tableSource} ON ${tableName}.contacts_id =  ${tableSource}.id`;			
		db.all(sql, function(err, rows) {
			if (err) {
				callback(err, null);
				throw err;
			} else {
				callback(null, rows);
			}
		})

		db.close();
	}

	/* Method pengganti updateDataById(data) */
	static update(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `UPDATE ${tableName} SET street = "${data.editItem.street}", city = "${data.editItem.city}", zipcode = ${+data.editItem.zipcode}, contacts_id = ${+data.editItem.contacts_id} WHERE id = ${data.id}`;
		db.run(sql, function(err, rows){
			if (err) {
				console.error(err);
				callback(err, null, null);
			} else {
				callback(null, rows, this.lastID);
			}
		});

		db.close();
	}

	/* Method pengganti deleteDataById(data) */
	static removeItem(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `DELETE FROM ${tableName} WHERE id = ${data.id}`;

		db.run(sql, function(err, rows) {
			if (err) {
				callback(err, null, null);
			} else {
				callback(null, rows, this);
			}
		});
		db.close();
	}
}

module.exports = AddressesModel;