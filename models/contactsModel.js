const sqlite3 = require('sqlite3').verbose()
const db 	  = new sqlite3.Database('database.db');

class Contact{

	static getAllContact(cb){
		db.all("select * from Contacts", (err, row)=>{
			cb(row)
		})
	}

	static getAllContactGroup(cb){
		console.log('masuk sini');
		db.all(`select C.id, C.name, C.company, C.telp_number, C.email, G.name_of_group from Contacts as C left join ContactGroup as CG on C.id = CG.id_contact left join Groups as G on CG.id_group = G.id`, (err, contacts)=>{
			if(err){
				console.log(err);
			}else{
				cb(contacts)
			}
		})
	}


	static addContact(data, cb){
		db.run(`insert into Contacts (name, telp_number, email) values ("${data.name}", "${data.telp_number}", "${data.email}")`, function(err){
			if(!err){
				data.id = this.lastID
				db.run(`insert into ContactGroup (id_contact, id_group) values ("${data.id}", "${data.group}")`, err=>{
					if(!err){
						cb()
					}else{
						console.log(err);
					}
				})	
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