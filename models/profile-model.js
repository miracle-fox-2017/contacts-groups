const sqlite3 = require('sqlite3').verbose();

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
			db.close();
		})
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
			db.close();
		})
	}

	addData(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `INSERT INTO ${this.tablename} (username, password) VALUES ("${data.username}", "${data.password}")`;
		db.run(sql);
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `UPDATE ${this.tablename} SET username = "${data.editItem.username}", password = "${data.editItem.password}" WHERE id = ${data.id}`;
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

module.exports = ProfilesModel;