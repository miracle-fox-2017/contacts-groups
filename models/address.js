const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Address {
	static findAll(){
		let getAllAddresses = `SELECT * FROM Addresses`;
		return new Promise((resolve,reject) =>{
			db.all(getAllAddresses, function(err,rowAddresses){
				if(err){
					reject(err);
				}else{
					resolve(rowAddresses)
				}
			})
		})
	}

	static findAllWithContact() {
		let getAllAddresses = `SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Addresses LEFT JOIN Contacts on Addresses.contact_id = Contacts.id `;
		return new Promise((resolve,reject)=>{
			db.all(getAllAddresses, function(err, rowAddresses){
				if(err){
					reject(err);
				}else{
					resolve(rowAddresses);
				}
			})
		})
	}

	static create(add){
		let insert = `INSERT INTO Addresses (street, city , zipcode, contact_id) VALUES ("${add.street}", "${add.city}", ${add.zipcode}, ${add.contact_id}) `
		return new Promise((resolve,reject) =>{
			db.run(insert, function(err, rowAddresses){
				if(err){
					reject(err);
				}else{
					resolve(rowAddresses);
				}
			})
		})
	}

	static remove(index){
		let rmv = `DELETE FROM Addresses WHERE id = ${index} `;
		return new Promise((resolve,reject)=>{
			db.run(rmv, function(err){
				if(err){
					reject(err);
				}else{
					resolve()
				}
			})
		})
	}

	static update(change){
		change.id = Number(change.id)
		let replace = `UPDATE Addresses SET street = "${change.street}", city = "${change.city}", contact_id = ${change.contact_id}, contact_id = ${change.contact_id} WHERE id = ${change.id} `;
		return new Promise((resolve,reject)=>{
			db.run(replace, function(err, rowContact){
				if(err){
					reject(err);
				}else{
					resolve(rowContact);
				}
			})
		})
	}

	static findById(findId){
		let find = `SELECT * FROM Addresses WHERE id = "${findId}"`;
		return new Promise((resolve,reject) => {
			db.get(find, function(err,contact){
				if(err){
					reject(err);
				}else{
					resolve(contact);
				}
			})
		})
	}

	// static findByContact(idContact){
	// 	let findName = `SELECT * FROM Addresses WHERE contact_id = ${idContact} `
	// 	return new Promise((resolve,reject) =>{
	// 		db.get(findName, function(err,address){
	// 			if(err){
	// 				reject(err)
	// 			}else{
	// 				resolve(address)
	// 			}
	// 		})
	// 	})
	// }
}	

module.exports = Address