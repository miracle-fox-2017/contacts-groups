const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Groups';

class GroupsModel {
	constructor(dbFile) {
		this.tablename = 'Groups';
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

	getAllDataConjunctionInnerJoin(tableSource, callback) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `Select * FROM ${tableSource} INNER JOIN ${this.tablename} ON ${tableSource}.groups_id = ${this.tablename}.id ;`;
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
		let sql = `INSERT INTO ${this.tablename} (name_of_group) VALUES ("${data.name_of_group}")`;
		db.run(sql);
		db.close();
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `UPDATE ${this.tablename} SET name_of_group = "${data.editItem.name_of_group}" WHERE id = ${data.id}`;
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

		db.all(sql, (err, rows) => {
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
	static create(data) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `INSERT INTO ${tableName} (name_of_group) VALUES ("${data.name_of_group}")`;
		db.run(sql);
		db.close();
	}
}

module.exports = GroupsModel;