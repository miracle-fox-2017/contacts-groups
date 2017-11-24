const sqlite3 = require('sqlite3').verbose()
const db 	  = new sqlite3.Database('database.db');

class Contact{
 
	static getAllContact(){
		return new Promise((resolve, reject) => {
			db.all(`select * from Contacts`, (err, contacts)=>{
				if(!err){
					resolve(contacts)
				}else{
					reject(err)
				}
			})
		})
	}

	static addContact(data){
		return new Promise((resolve, reject) => {
			db.run(`insert into Contacts (name, company, telp_number, email) values ("${data.name}", "${data.company}", "${data.telp_number}", "${data.email}")`, function(err){
				if(!err){
					data.id = this.lastID
					db.run(`insert into ContactGroup (id_contact, id_group) values (${data.id}, ${data.group})`, err=>{
						if(!err){
								resolve()
							}else{
								reject(err);
							}
					})	
				}
			})
		});
	}

	static getContactById(data){
		
		return new Promise((resolve, reject) => {
			db.get(`select * from Contacts where id = ${data}`, (err, contact)=>{
				if(!err){
					resolve(contact)
				}else{
					reject(err)
				}
			})
		});
	}

	static editContact(data){

		return new Promise((resolve, reject) => {
			db.run(`update Contacts set name = "${data.name}", telp_number = "${data.telp_number}", email = "${data.email}" where id = ${data.id}`, err=>{
				if(err){
					reject(err);
				}else{
					resolve()
				}
			})
		})
	}

	static deleteContact(data){

		return new Promise((resolve, reject) => {
			db.run(`delete from Contacts where id = ${data}`, err=>{
				if(err){
					reject(err);
				}else{
					resolve()
				}
			})
		})
	}

	static getAddressByIdContact(data){
		return new Promise((resolve, reject) => {
			db.all(`select * from Addresses where id_contact = ${data}`, (err, addresses)=> {
				this.getContactById(data).then(contact=> {
					resolve({addresses, contact})
				})
			})
		});
	}
}

module.exports = Contact