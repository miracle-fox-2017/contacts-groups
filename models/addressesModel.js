const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');
const Contact = require('./contactsModel')

class Address{

	static getAllAddress(){

		return new Promise((resolve, reject) => {
			db.all(`select * from Addresses`, (err, addresses)=>{
				if(!err){
					resolve(addresses)
				}else{
					reject(err)
				}
			})
		});
	}

	static addAddress(data){
			
		return new Promise((resolve, reject) => {
			db.run(`insert into Addresses (street, city, zipcode, id_contact) values ("${data.street}", "${data.city}", "${data.zipcode}", "${data.contact}")`, err=>{
				if(err){
					reject(err)
				}else{
					resolve()
				}
			})
		})
	}

	static getAddressById(data){
		
		return new Promise((resolve, reject) => {
			db.get(`select * from Addresses where id = "${data}"`, (err, address)=>{
				if(!err){
					resolve(address)
				}else{
					reject(err)
				}
			})
		});
	}

	static editAddress(data){

		return new Promise((resolve, reject) => {
			db.run(`update Addresses set street = "${data.street}", city = "${data.city}"	, zipcode = "${data.zipcode}", id_contact = "${data.contact}" where id = "${data.id}"`, err=>{
				if(err){
					reject(err);
				}else{
					resolve()
				}
			})
		});
	}

	static deleteAddress(data){
		
		return new Promise((resolve, reject) => {
			db.run(`delete from Addresses where id = "${data}"`, err=>{
				if(err){
					reject(err);	
				}else{
					resolve()
				}
			})
		});
	}

	static getAllAddressContact(){

		return new Promise((resolve, reject) => {
			this.getAllAddress().then(allAddress=> {
				let addresses = allAddress.map(address=> {
					return Contact.getContactById(address.id_contact).then(contactById=> {
						address.name = contactById.name
						return address
					})
				})

				let contacts = Contact.getAllContact()

				Promise.all(addresses).then(alladdress=> {
					Promise.all([contacts]).then(tempallcontact=> {
						let allcontact = tempallcontact[0]
						resolve({alladdress, allcontact})
					})
				})
			})
		})
	}

	static getAddressContactById(data){

		return new Promise((resolve, reject) => {
			this.getAddressById(data).then(address=>{
				Contact.getContactById(address.id_contact).then(kontak=>{
					address.name = kontak.name
					resolve(address)
				})
			})
		});
	}
}

module.exports = Address