const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Profile {
	static findAll(){
		return new Promise((resolve,reject)=>{
			db.all(getAllProfile, function(err, rowProfile){
				if(err){
					reject(err)
				}else{
					resolve(rowProfile)
				}
			})
		})
	}

	static findAllWithContact() {
		let getAllProfile = `SELECT Profile.id, Profile.username, Profile.password, Profile.contact_id, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email FROM Profile LEFT JOIN Contacts on Profile.contact_id = Contacts.id `;
		return new Promise((resolve,reject)=>{
			db.all(getAllProfile, function(err,rowProfile){
				if(err){
					reject(err);
				}else{
					resolve(rowProfile);
				}
			})			
		})
	}

	static create(add){
		let insert = `INSERT INTO Profile (username, password, contact_id) VALUES ("${add.username}", "${add.password}", ${add.contact_id}) `;
		return new Promise((resolve,reject)=>{
			db.all(insert, function(err, rowProfile){
				if(err){
					reject(err);
				}else{
					resolve(rowProfile);
				}
			})
		})
	}

	static remove(index, cb){
		let rmv = `DELETE FROM Profile WHERE id = ${index} `;
		return new Promise((resolve,reject) =>{
			db.run(rmv, function(err){
				if(err){
					reject(err);
				}else{
					resolve()
				}
			})
		})
	}

	static update(change, cb){
		change.id = Number(change.id)
		let replace = `UPDATE Profile SET username = "${change.username}", password = "${change.password}", contact_id = ${change.contact_id} WHERE id = ${change.id} `;
		return new Promise((resolve,reject) =>{
			db.all(replace, function(err,rowProfile){
				if(err){
					reject(err);
				}else{
					resolve(rowProfile);
				}
			})
		})
	}

	static findById(findId){
		let find = `SELECT * FROM Profile WHERE id = "${findId}"`;
		return new Promise((resolve,reject)=>{
			db.all(find, function(err,contact){
				if(err){
					reject(err)
				}else{
					resolve(contact)
				}				
			})
		})
	}
}	

module.exports = Profile