const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');
const Contact = require('./contactsModel')

class Address{

	static getAllAddress(cb){
		db.all("select * from Addresses", (err, row)=>{
			cb(row)
		})
	}

	static getAllAddressContact(cb){
		db.all(`select A.id, A.street, A.city, A.zipcode, C.name from Addresses as A left join Contacts as C on A.id_contact = C.id`, (err, addresses)=>{
			if(err){
				console.log(err)
			}else{
				Contact.getAllContact(contacts=>{
					cb({addresses, contacts})
				})
			}
		})
	}

	static addAddress(data, cb){
		db.run(`insert into Addresses (street, city, zipcode, id_contact) values ("${data.street}", "${data.city}", "${data.zipcode}", "${data.contact}")`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	static getAddressById(data, cb){
		db.get(`select * from Addresses where id = "${data}"`, (err, row)=>{
			if(!err){
				cb(row)
			}else{
				console.log(err);
			}
		})
	}

	static getAddressContactById(data, cb){
		db.get(`select A.id, A.street, A.city, A.zipcode, A.id_contact, C.name from Addresses as A left join Contacts as C on A.id_contact = C.id where A.id = "${data}"`, (err, address)=>{
			if(err){
				console.log(err)
			}else{
				Contact.getAllContact(contacts=>{
					cb({address, contacts})
				})
			}
		})
	}

	static editAddress(data, cb){
		db.run(`update Addresses set street = "${data.street}", city = "${data.city}", zipcode = "${data.zipcode}", id_contact = "${data.contact}" where id = "${data.id}"`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	static deleteAddress(data, cb){
		db.run(`delete from Addresses where id = "${data}"`, err=>{
			if(err){
				console.log(err);	
			}else{
				cb()
			}
		})
	}
}

module.exports = Address