var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db');

class Contact{

	static getAllAddress(cb){
		db.all("select * from Addresses", (err, row)=>{
			cb(row)
		})
	}

	static addAddress(data, cb){
		db.run(`insert into Addresses (street, city, zipcode) values ("${data.street}", "${data.city}", "${data.zipcode}")`, err=>{
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

	static editAddress(data, cb){
		db.run(`update Addresses set street = "${data.street}", city = "${data.city}", zipcode = "${data.zipcode}" where id = "${data.id}"`, err=>{
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

module.exports = Contact