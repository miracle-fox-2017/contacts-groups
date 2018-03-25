const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Addresses';

class AddressesModel {
	constructor() {}

	/* Method pengganti addData(data) */
	static create(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `INSERT INTO ${tableName} (street, city, zipcode, contacts_id) VALUES ("${data.street}", "${data.city}", ${+data.zipcode}, ${+data.contacts_id})`;

			db.run(sql, function(err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve({rows: rows, lastID: this.lastID});
				}
			});

			db.close();
		});
	}

	/* Method pengganti getAllData(callback) */
	static findAll() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `SELECT * FROM ${tableName}`;
			db.all(sql, function(err, rows) {
				if (err) {
					reject({err: err, message: 'Something wrong with sql query!'});
				} else {
					resolve(rows);
				}
			})

			db.close();
		});
	}

	/* Method pengganti getById(data) */
	static findById(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `SELECT * FROM ${tableName} WHERE id = ${data.id}`;
			db.get(sql, (err, rows) =>{
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});

			db.close();
		});
	}

	/* Method pengganti getAllDataInnerJoin(tableSource, callback) */
	static findAllDataInnerJoin(tableSource = 'Contacts') {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `select ${tableName}.id, ${tableName}.street, ${tableName}.city, ${tableName}.zipcode , ${tableName}.contacts_id, ${tableSource}.name, ${tableSource}.company
			from ${tableName}
			inner join ${tableSource} ON ${tableName}.contacts_id =  ${tableSource}.id`;		

			db.all(sql, function(err, rows) {
				if (err) {
					reject(err);
					
				} else {
					resolve(rows);
				}
			})

			db.close();
		});
	}

	/* Method pengganti updateDataById(data) */
	static update(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `UPDATE ${tableName} SET street = "${data.editItem.street}", city = "${data.editItem.city}", zipcode = ${+data.editItem.zipcode}, contacts_id = ${+data.editItem.contacts_id} WHERE id = ${data.id}`;
			db.run(sql, function(err, rows){
				if (err) {
					reject(err);
				} else {
					resolve({rows : rows, lastID:this.lastID});
				}
			});

			db.close();
		});
	}

	/* Method pengganti deleteDataById(data) */
	static removeItem(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `DELETE FROM ${tableName} WHERE id = ${data.id}`;

			db.run(sql, function(err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
			db.close();
		});
	}
}

module.exports = AddressesModel;