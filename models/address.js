const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Address {
	static findAll(cb){
		let getAllAddresses = `SELECT * FROM Addresses`;
		db.all(getAllAddresses, function(err, rowAddresses){
			if (err) throw err;
			cb(err,rowAddresses);
		})
	}

	static findAllWithContact(cb) {
		let getAllAddresses = `SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses LEFT JOIN Contacts on Addresses.contact_id = Contacts.id `;
		db.all(getAllAddresses, function(err, rowAddresses){
			if (err) throw err;
			cb(err,rowAddresses);
		})
	}

	static create(add, cb){
		let insert = `INSERT INTO Addresses (street, city , zipcode, contact_id) VALUES ("${add.street}", "${add.city}", ${add.zipcode}, ${add.contact_id}) `;		  
		db.all(insert, function(err, rowAddresses){
			if (err) throw err;
			cb(err,rowAddresses);
		})
	}

	static remove(index, cb){
		let rmv = `DELETE FROM Addresses WHERE id = ${index} `;
		db.run(rmv, function(err){
			if (err) throw err;
			cb()
		})
	}

	static update(change, cb){
		change.id = Number(change.id)
		let replace = `UPDATE Addresses SET street = "${change.street}", city = "${change.city}", contact_id = ${change.contact_id}, contact_id = ${change.contact_id} WHERE id = ${change.id} `;
		db.all(replace, function(err, rowContact){
			if(err) throw err;
			cb(err,rowContact);
		})
	}

	static findById(findId, cb){
		let find = `SELECT * FROM Addresses WHERE id = "${findId}"`;
		db.all(find, function(err,contact){
			if (err) throw err;
			
			cb(err,contact)
		})
	}

	static findByContact(idContact, cb){
		let findName = `SELECT * FROM Addresses WHERE contact_id = ${idContact} `
		db.all(findName, function(err,address){
			if (err) throw err;

			cb(err, address)
		})
	}
}	

module.exports = Address