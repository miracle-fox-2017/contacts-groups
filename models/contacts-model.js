const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Contacts';

class ContactsModel {
	constructor(dbFile) {
		this.tablename = 'Contacts';
		this.dbFile = dbFile;
	}

	getLatestIdSequence(tableName = this.tablename, callback) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `SELECT seq FROM sqlite_sequence WHERE name like "${tableName}"`;
		db.get(sql, (err,rows) => {
			if (err) {
				throw err;
			} 

			callback(rows);
		})
		db.close();
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

	getAllDataArrayJoin(addresses, contacts) {
		let joinedData = [];

		for (var i = 0; i < addresses.length; i++) {
			let obj = {};
			obj.id = addresses[i].id,
			obj.street = addresses[i].street,
			obj.city = addresses[i].city;
			obj.zipcode = addresses[i].zipcode;
			obj.name = '';
			obj.company = '';
			obj.telp_number = '';
			obj.email = '';

			for (var j = 0; j < contacts.length; j++) {

				if (addresses[i].contacts_id === contacts[j].id) {
					obj.name = contacts[j].name;
					obj.company = contacts[j].company;
					obj.telp_number = contacts[j].telp_number;
					obj.email = contacts[j].email;
				}
			}

			joinedData.push(obj);
		}

		return joinedData;
	}

	getAllDataArrayJoinContactsGroups(contact, contactsGroups) {
		let joinedData = [];

		for (var i = 0; i < contact.length; i++) {
			let obj = {};
			obj.id = contact[i].id;
			obj.name = contact[i].name;
			obj.company = contact[i].company;
			obj.telp_number = contact[i].telp_number;
			obj.email = contact[i].email;
			obj.name_of_group = [];

			joinedData.push(obj);

			for (var j = 0; j < contactsGroups.length; j++) {
				if (contactsGroups[j].contacts_id == contact[i].id) {
					obj.name_of_group.push(contactsGroups[j].name_of_group);
				}
			}
		}

		return joinedData;
	}

	addData(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `INSERT INTO ${this.tablename} (name, company, telp_number, email) VALUES ("${data.name}", "${data.company}", "${data.telp_number}", "${data.email}")`;
		db.run(sql);
		db.close();
	}

	addDataContactGroups(data, conjTable = 'Contacts_Groups') {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `INSERT INTO ${conjTable} (contacts_id, groups_id) VALUES (${data.contacts_id}, ${data.groups_id})`;
		db.run(sql);
		db.close();
	}

	updateDataById(data) {
		let db = new sqlite3.Database(this.dbFile);
		let sql = `UPDATE ${this.tablename} SET name = "${data.editItem.name}", company = "${data.editItem.company}", telp_number = "${data.editItem.telp_number}", email = "${data.editItem.email}" WHERE id = ${data.id}`;
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
		let sql = `INSERT INTO ${tableName} (name, company, telp_number, email) VALUES ("${data.name}", "${data.company}", "${data.telp_number}", "${data.email}")`;

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

	/* Method pengganti getAllDataArrayJoinContactsGroups(contact, contactsGroups) */
	static findAllJoinContactsGroups(contact, contactsGroups) {
		let joinedData = [];

		for (var i = 0; i < contact.length; i++) {
			let obj = {};
			obj.id = contact[i].id;
			obj.name = contact[i].name;
			obj.company = contact[i].company;
			obj.telp_number = contact[i].telp_number;
			obj.email = contact[i].email;
			obj.name_of_group = [];

			joinedData.push(obj);

			for (var j = 0; j < contactsGroups.length; j++) {
				if (contactsGroups[j].contacts_id == contact[i].id) {
					obj.name_of_group.push(contactsGroups[j].name_of_group);
				}
			}
		}

		return joinedData;
	}

	/* Method pengganti updateDataById(data) */
	static update(data, callback) {
		let db = new sqlite3.Database(dbLocation);
		let sql = `UPDATE ${tableName} SET name = "${data.editItem.name}", company = "${data.editItem.company}", telp_number = "${data.editItem.telp_number}", email = "${data.editItem.email}" WHERE id = ${data.id}`;
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
	static delete(data, callback) {
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

module.exports = ContactsModel;