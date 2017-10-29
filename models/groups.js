const sqlite3 = require('sqlite3').verbose();

class GroupsModel {
	constructor(file) {
		this.tablename = 'Groups';
		this.file = file;
	}

	getAllData(callback) {
		let db = new sqlite3.Database(this.file);
		let query = `SELECT * FROM ${this.tablename}`;
		db.all(query, (err, rows) => {
			if (err) {
				throw err;
			} 

			callback(rows);
			db.close();
		})
	}

	tambahData(data) {
		let db = new sqlite3.Database(this.file);
		let query = `INSERT INTO ${this.tablename} (name_of_group) VALUES ("${data.name_of_group}")`;
		db.run(query);
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.file);
		let query = `UPDATE ${this.tablename} SET name_of_group = "${data.edited.name_of_group}" WHERE id = ${data.id}`;
		db.run(query);
	}

	hapusDataById(data) {
		let db = new sqlite3.Database(this.file);
		let query = `DELETE FROM ${this.tablename} WHERE id = ${data.id}`;
		db.run(sql);
	}

	getById(data, callback) {
		let db = new sqlite3.Database(this.file);
		let query = `SELECT * FROM ${this.tablename} WHERE id = ${data.id}`;
		db.get(query, (err, rows) =>{
			if (err) {
				throw err;
			} 

			callback(rows);
			db.close();
		});
	}
}

module.exports = GroupsModel;