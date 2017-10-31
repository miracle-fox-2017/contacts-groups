const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Profile';

class ProfilesModel {
	constructor() {
	}

	/* Method pengganti getAllData(callback) */
	static findAll() {
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
	static create(data) {
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

	/* Method pengganti updateDataById(data) */
	static update(data) {
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
	static removeItem(data) {
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
	static findAllDataInnerJoin(tableSource = 'Contacts') {
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