const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Contact {
	static findAll(){
		let getAllContact = `SELECT * FROM Contacts `;
		return new Promise((resolve,reject)=>{
			db.all(getAllContact, function(err, rowContact){
				if(err){
					reject (err);
				}else{
					resolve(rowContact)
				}				
			})
		})
	}

	static create(add){
		let insert = `INSERT INTO Contacts (name, company, telp_number, email)
					  VALUES ("${add.name}", "${add.company}", "${add.telp_number}", "${add.email}")`;
		return new Promise((resolve,reject) =>{
			db.all(insert, function(err, rowContact){
				if(err){
					reject(err);
				}else{
					resolve(rowContact);
				}
			})
		})
	}

	static remove(index, cb){
		let rmv = `DELETE FROM Contacts WHERE id = ${index} `;
		return new Promise((resolve,reject) =>{
			db.run(rmv, function(err){
				if(err){
					reject(err);
				}else{
					resolve();
				}
			})
		})
	}

	static update(change){
		change.id = Number(change.id)
		let replace = `UPDATE Contacts SET name = "${change.name}", company = "${change.company}", telp_number = "${change.telp_number}", email = "${change.email}" WHERE id = ${change.id}`;
		return new Promise((resolve,reject) =>{
			db.all(replace, function(err, rowContact){
				if(err){
					reject(err);
				}else{
					resolve(rowContact);
				}
			})
		})
	}

	static findById(findId){
		let find = `SELECT * FROM Contacts WHERE id = ${findId}`;
		return new Promise((resolve,reject) =>{
			db.all(find, function(err, contact){
				if(err){
					reject(err)
				}else{
					resolve(contact)
				}
			})
		})		
	}
}	

module.exports = Contact