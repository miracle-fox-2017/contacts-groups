var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db');

class Profile{

	static getAllProfile(cb){
		db.all("select * from Profile", (err, rows)=>{
			cb(rows)
		})
	}

	static addProfile(data, cb){
		db.run(`insert into Profile (username, password) values ("${data.username}", "${data.password}")`, err=>{
			if(err){
				console.log(err);
			}else{
				cb()
			}
		})
	}

	static getProfileById(data, cb){
		db.get(`select * from Profile where id = "${data}"`, (err, row)=>{
			if(!err){
				cb(row)
			}else{
				console.log(err);
			}
		})
	}

	static editProfile(data, cb){
		db.run(`update Profile set username = "${data.username}", password = "${data.password}" where id = "${data.id}"`, err=>{
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