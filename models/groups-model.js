const sqlite3 = require('sqlite3').verbose();
const dbLocation = './database/database.db';
const tableName = 'Groups';

class GroupsModel {
	constructor(dbFile) {
		this.tablename = 'Groups';
		this.dbFile = dbFile;
	}

	/* Method pengganti getAllData(callback) */
	static findAll() {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `SELECT * FROM ${tableName}`;
			db.all(sql, (err, rows) => {
				if (err) {
					reject({err: err, message: 'Something wrong with sql query on findAll()'});
				} else {
					resolve(rows);
				}
			})

			db.close();
		});
	}

	/* Method pengganti getAllDataConjunctionInnerJoin(tableSource, callback) */
	static findAllInnerJoin(tableSource, tableTarget) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `Select * FROM ${tableSource} INNER JOIN ${tableTarget} ON ${tableSource}.groups_id = ${tableTarget}.id ;`;

			db.all(sql, function(err, rows) {
				if (err) {
					reject({err: err, message: 'Something wrong with sql query on findAllInnerJoin()'});
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
			let sql = `INSERT INTO ${tableName} (name_of_group) VALUES ("${data.name_of_group}")`;

			db.run(sql, function(err, rows) {
				if (err) {
					reject({err: err, message: 'Something wrong with sql query on create()'});
				} else {
					resolve(rows);
				}
			});

			db.close();
		});
	}

	/* Method pengganti getById(data, callback) */
	static findById(data, callback) {
		return new Promise((resolve, reject) => {
			let db = new sqlite3.Database(dbLocation);
			let sql = `SELECT * FROM ${tableName} WHERE id = ${data.id}`;
			db.get(sql, function (err, rows) {
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
			let sql = `UPDATE ${tableName} SET name_of_group = "${data.editItem.name_of_group}" WHERE id = ${data.id}`;

			db.run(sql, function(err, rows){
				if (err) {
					reject(err);
				} else {
					resolve({rows: rows, lastID : this.lastID});
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
					resolve();
				}
			});
			db.close();
		});
	}

	static findAllJoinConjunction(allGroups, allContacts, allContactGroup) {
		let arrJoinedGroups = [];

		allGroups.forEach( function(group) {
			let obj = {};
			obj.id = group.id;
			obj.name_of_group = group.name_of_group;
			obj.contacts_name = [];

			allContacts.forEach( function(contact) {
				allContactGroup.forEach( function(item) {
					if (group.id == item.groups_id && contact.id == item.contacts_id) {
						obj.contacts_name.push(contact.name);
					}
				});
			});

			arrJoinedGroups.push(obj);
		});

		return arrJoinedGroups;
	}
}

module.exports = GroupsModel;