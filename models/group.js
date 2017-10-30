const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Group {
	static findAll(cb){
		let getAllGroups = `SELECT * FROM Groups`;
		db.all(getAllGroups, function(err, rowGroup){
			if (err) throw err;
			cb(err,rowGroup);
		})
	}

	// static findAllWithContact(cb) {
	// 	let getAllGroups = `SELECT Groups.id, Groups.username, Groups.password, Groups.contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Groups LEFT JOIN Contacts on Groups.contact_id = Contacts.id `;
	// 	db.all(getAllGroups, function(err, rowGroup){
	// 		if (err) throw err;
	// 		cb(err,rowGroup);
	// 	})
	// }

	static create(add, cb){
		let insert = `INSERT INTO Groups (name_of_group) VALUES ("${add.name_of_group}")`;		  
		db.all(insert, function(err, rowGroup){
			if (err) throw err;

			cb(err,rowGroup);
		})
	}

	static remove(index, cb){
		let rmv = `DELETE FROM Groups WHERE id = ${index} `;
		db.run(rmv, function(err){
			if (err) throw err;
			cb()
		})
	}

	static update(change, cb){
		change.id = Number(change.id)
		let replace = `UPDATE Groups SET name_of_group = "${change.name_of_group}" WHERE id = ${change.id} `;
		db.all(replace, function(err, rowContact){
			if(err) throw err;
			cb(err,rowContact);
		})
	}

	static findById(findId, cb){
		let find = `SELECT * FROM Groups WHERE id = "${findId}"`;
		db.all(find, function(err,contact){
			if (err) throw err;
			
			cb(err,contact)
		})
	}
}	

module.exports = Group