const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Contact {
	static findAll(cb){
		let getAllContact = `SELECT * FROM Contacts `;
		db.all(getAllContact, function(err, rowContact){
			if (err) throw err;
			cb(err,rowContact);
		})
	}

	static create(add, cb){
		let insert = `INSERT INTO Contacts (name, company, telp_number, email)
					  VALUES ("${add.name}", "${add.company}", "${add.telp_number}", "${add.email}")`;
		db.all(insert, function(err, rowContact){
			if (err) throw err;
			cb(err,rowContact);
		})
	}

	static remove(index, cb){
		let rmv = `DELETE FROM Contacts WHERE id = ${index} `;
		db.run(rmv, function(err){
			if (err) throw err;
			cb()
		})
	}

	static update(change,cb){
		change.id = Number(change.id)
		let replace = `UPDATE Contacts SET name = "${change.name}", company = "${change.company}", telp_number = "${change.telp_number}", email = "${change.email}" WHERE id = ${change.id}`;
		db.all(replace, function(err, rowContact){

			cb(err,rowContact);
		})
	}

	static findById(findId, cb){
		let find = `SELECT * FROM Contacts WHERE id = ${findId}`;
		db.all(find, function(err,contact){
			if (err) throw err;
			
			cb(err,contact)
		})
	}
}	

module.exports = Contact