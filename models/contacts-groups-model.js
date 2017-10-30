const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Contacts_Groups';

class ContactsGroupsModel {
	constructor() {
		
	}

	static findAll(callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `SELECT * FROM ${tableName}`;
		db.all(sql, function(err, rows) {
			if (err) {
				callback({err: err, message: 'Something wrong with sql query!'}, null);
			} else {
				callback(null, rows);
			}
		})

		db.close();
	}

	static create(data) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `INSERT INTO ${tableName} (contacts_id, groups_id) VALUES (${data.contacts_id}, ${data.groups_id})`;
		db.run(sql);
		db.close();
	}
}

module.exports = ContactsGroupsModel;