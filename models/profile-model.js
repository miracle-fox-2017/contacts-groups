const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Profile';

class ProfilesModel {
	constructor(dbFile) {
		this.tablename = 'Profile';
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
		let sql = `select ${this.tablename}.id, ${this.tablename}.username, ${this.tablename}.password, ${this.tablename}.contacts_id, ${tableSource}.name
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
		let sql = `INSERT INTO ${this.tablename} (username, password, contacts_id) VALUES ("${data.username}", "${data.password}", ${+data.contacts_id})`;
		db.run(sql);
		db.close();
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `UPDATE ${this.tablename} SET username = "${data.editItem.username}", password = "${data.editItem.password}" WHERE id = ${data.id}`;
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
}

module.exports = ProfilesModel;