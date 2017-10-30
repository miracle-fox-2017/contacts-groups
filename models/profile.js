const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Profile {
	static findAll(cb){
		let getAllProfile = `SELECT * FROM Profile`;
		db.all(getAllProfile, function(err, rowProfile){
			if (err) throw err;
			cb(err,rowProfile);
		})
	}

	static findAllWithContact(cb) {
		let getAllProfile = `SELECT Profile.id, Profile.username, Profile.password, Profile.contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profile LEFT JOIN Contacts on Profile.contact_id = Contacts.id `;
		db.all(getAllProfile, function(err, rowProfile){
			if (err) throw err;
			cb(err,rowProfile);
		})
	}

	static create(add, cb){
		let insert = `INSERT INTO Profile (username, password, contact_id) VALUES ("${add.username}", "${add.password}", ${add.contact_id}) `;		  
		db.all(insert, function(err, rowProfile){
			if (err) throw err;

			cb(err,rowProfile);
		})
	}

	static remove(index, cb){
		console.log(index)
		let rmv = `DELETE FROM Profile WHERE id = ${index} `;
		db.run(rmv, function(err){
			if (err) throw err;
			cb()
		})
	}

	static update(change, cb){
		change.id = Number(change.id)
		let replace = `UPDATE Profile SET username = "${change.username}", password = "${change.password}", contact_id = ${change.contact_id} WHERE id = ${change.id} `;
		db.all(replace, function(err, rowContact){
			if(err) throw err;
			cb(err,rowContact);
		})
	}

	static findById(findId, cb){
		let find = `SELECT * FROM Profile WHERE id = "${findId}"`;
		db.all(find, function(err,contact){
			if (err) throw err;
			
			cb(err,contact)
		})
	}
}	

module.exports = Profile