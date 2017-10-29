var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db');

class Group{

	static getAllGroup(cb){
		db.all(`select * from Groups`, (err, rows)=>{
			if(err){
				console.log(err)
			}else{
				cb(rows)
			}
		})
	}

	static addGroup(data, cb){
		db.run(`insert into Groups (name_of_group) values ("${data}")`, err=>{
			if(err){
				console.log(err)
			}else{
				cb()
			}
		})
	}

	static getGroupById(data, cb){
		db.get(`select * from Groups where id = "${data}"`, (err, result)=>{
			if(err){
				console.log(err)
			}else{
				cb(result)
			}
		})
	}

	static editGroup(data, cb){
		db.run(`update Groups set name_of_group = "${data.name_of_group}" where id = "${data.id}"`, err=>{
			if(err){
				console.log(err)
			}else{
				cb()
			}
		})
	}

	static deleteGroup(data, cb){
		db.run(`delete from Groups where id = "${data}"`, err=>{
			if(err){
				console.log(err)
			}else{
				cb()
			}
		})
	}
}

module.exports = Group