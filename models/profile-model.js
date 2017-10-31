const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Profile';

class ProfilesModel {
	constructor(dbFile) {
		this.tablename = 'Profile';
		this.dbFile = dbFile;
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

	static findAllPromise() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `SELECT * FROM ${tableName}`;

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

	/* Method pengganti addData(data) */
	static create(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `INSERT INTO ${tableName} (username, password, contacts_id) VALUES ("${data.username}", "${data.password}", ${+data.contacts_id})`;

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

	static createPromise(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `INSERT INTO ${tableName} (username, password, contacts_id) VALUES ("${data.username}", "${data.password}", ${+data.contacts_id})`;

			db.run(sql, function(err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve({rows: rows, lastId: this.lastID});
				}
			});

			db.close();
		});
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

	static findByIdPromise(data) {
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

	/* Method pengganti updateDataById(data) */
	static update(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `UPDATE ${tableName} SET username = "${data.editItem.username}", password = "${data.editItem.password}" WHERE id = ${data.id}`;

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

	static updatePromise(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `UPDATE ${tableName} SET username = "${data.editItem.username}", password = "${data.editItem.password}" WHERE id = ${data.id}`;

			db.run(sql, function(err, rows){
				if (err) {
					reject(err);
				} else {
					resolve({rows: rows, lastId: this.lastID});
				}
			});

			db.close();
		});
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

	static removeItemPromise(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `DELETE FROM ${tableName} WHERE id = ${data.id}`;

			db.run(sql, function(err, rows) {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});

			db.close();
		});
	}

	/* Method pengganti getAllDataInnerJoin  */
	static findAllDataInnerJoin(tableSource = 'Contacts', callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `select ${tableName}.id, ${tableName}.username, ${tableName}.password, ${tableName}.contacts_id, ${tableSource}.name
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

	static findAllDataInnerJoinPromise(tableSource = 'Contacts') {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `select ${tableName}.id, ${tableName}.username, ${tableName}.password, ${tableName}.contacts_id, ${tableSource}.name
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
}

module.exports = ProfilesModel;