const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Contacts_Groups';

class ContactsGroupsModel {
	constructor() {
		
	}

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

	static create(data) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `INSERT INTO ${tableName} (contacts_id, groups_id) VALUES (${data.contacts_id}, ${data.groups_id})`;
			db.run(sql, (err, rows) => {
				if (err) {
					reject(err);
				} else {
					resolve({rows: rows, lastID: this.lastID})
				}
			});
			db.close();
		});
	}
}

module.exports = ContactsGroupsModel;