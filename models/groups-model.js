const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Groups';

class GroupsModel {
	constructor(dbFile) {
		this.tablename = 'Groups';
		this.dbFile = dbFile;
	}

	/* Method pengganti getAllData(callback) */
	static findAll(callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `SELECT * FROM ${tableName}`;
		db.all(sql, (err, rows) => {
			if (err) {
				callback({err: err, message: 'Something wrong with sql query on findAll()'}, null);
			} else {
				callback(null, rows);
			}
		})

		db.close();
	}

	/* Method pengganti getAllDataConjunctionInnerJoin(tableSource, callback) */
	static findAllInnerJoin(tableSource, tableTarget, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `Select * FROM ${tableSource} INNER JOIN ${tableTarget} ON ${tableSource}.groups_id = ${tableTarget}.id ;`;

		db.all(sql, function(err, rows) {
			if (err) {
				callback({err: err, message: 'Something wrong with sql query on findAllInnerJoin()'}, null);
				console.error(err);
			} else {
				callback(null, rows);
			}
		})

		db.close();
	}

	/* Method pengganti addData(data) */
	static create(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `INSERT INTO ${tableName} (name_of_group) VALUES ("${data.name_of_group}")`;
		db.run(sql, function(err, rows) {
			if (err) {
				callback({err: err, message: 'Something wrong with sql query on create()'}, null);
				console.error(err);
			} else {
				callback(null, rows);
			}
		});

		db.close();
	}

	/* Method pengganti getById(data, callback) */
	static findById(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `SELECT * FROM ${tableName} WHERE id = ${data.id}`;
		db.get(sql, function (err, rows) {
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
		let sql = `UPDATE ${tableName} SET name_of_group = "${data.editItem.name_of_group}" WHERE id = ${data.id}`;

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

module.exports = GroupsModel;