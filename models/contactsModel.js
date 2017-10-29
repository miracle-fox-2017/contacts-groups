const sqlite3 = require('sqlite3').verbose()
const db 	  = new sqlite3.Database('database.db');

class Contact{

	static getAllContact(cb){
		db.all("select * from Contacts", (err, row)=>{
			cb(row)
		})
	}


	static addContact(data, cb){
		db.run(`insert into Contacts (name, telp_number, email) values ("${data.name}", "${data.telp_number}", "${data.email}")`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	static getContactById(data, cb){
		db.get(`select * from Contacts where id = "${data}"`, (err, row)=>{
			if(!err){
				cb(row)
			}else{
				console.log(err);
			}
		})
	}

	static editContact(data, cb){
		db.run(`update Contacts set name = "${data.name}", telp_number = "${data.telp_number}", email = "${data.email}" where id = "${data.id}"`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	static deleteContact(data, cb){
		console.log('masuk sini');
		db.run(`delete from Contacts where id = "${data}"`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}
}

module.exports = Contact