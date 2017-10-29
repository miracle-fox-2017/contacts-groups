const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');
const Contact = require('./contactsModel')


class Profile{

	static getAllProfile(cb){
		db.all("select * from Profile", (err, rows)=>{
			cb(rows)
		})
	}

	static getAllProfileContact(cb){
		db.all(`select Profile.id, Profile.username, Profile.password, Contacts.name from Profile left join Contacts on Profile.id_contact = Contacts.id`, (err, profiles)=>{
			if(err){
				console.log(err)
			}else{
				Contact.getAllContact(contacts=>{
					cb({profiles, contacts})
				})
				// console.log(rows);
			}
		})
	}

	static addProfile(data, cb){
		db.run(`insert into Profile (username, password, id_contact) values ("${data.username}", "${data.password}", "${data.contact}")`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	// static getProfileById(data, cb){
	// 	db.get(`select * from Profile where id = "${data}"`, (err, row)=>{
	// 		if(!err){
	// 			cb(row)
	// 		}else{
	// 			console.log(err);
	// 		}
	// 	})
	// }

	static getProfileContactById(data, cb){
		db.get(`select P.id, P.username, P.password, C.name from Profile as P left join Contacts as C on P.id_contact = C.id where P.id = "${data}"`, (err, profile)=>{
			if(err){
				console.log(err)
			}else{
				Contact.getAllContact(contacts=>{
					cb({profile, contacts})
				})
			}
		})
	}

	static editProfile(data, cb){
		db.run(`update Profile set username = "${data.username}", password = "${data.password}", id_contact = "${data.contact}" where id = "${data.id}"`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	static deleteProfile(data, cb){
		db.run(`delete from Profile where id = "${data}"`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}
}

module.exports = Profile