const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/database.db');

class Group {
	static findAll(){
		let getAllGroups = `SELECT * FROM Groups`;
		return new Promise((resolve,reject) => {
			db.all(getAllGroups, function(err, rowGroup){
				if(err){
					reject(err);
				}else{
					resolve(rowGroup);
				}
			})
		})
	}

	static create(add){
		let insert = `INSERT INTO Groups (name_of_group) VALUES ("${add.name_of_group}")`;		  
		return new Promise((resolve,reject)=>{
			db.run(insert, function(err,rowGroup){
				if(err){
					reject(err);
				}else{
					resolve(rowGroup);
				}
			})
		})
	}

	static remove(index){
		let rmv = `DELETE FROM Groups WHERE id = ${index} `;
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
		let replace = `UPDATE Groups SET name_of_group = "${change.name_of_group}" WHERE id = ${change.id} `;
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
		let find = `SELECT * FROM Groups WHERE id = "${findId}"`;
		return new Promise((resolve,reject)=>{
			db.get(find, function(err,contact){
				if(err){
					reject(err);
				}else{
					resolve(contact)
				}					
			})

		})
	}
}	

module.exports = Group