var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database.db');

class Group{

	static getAllGroup(){

		return new Promise((resolve, reject) => {
			db.all(`select * from Groups`, (err, groups)=>{
				if(err){
					reject(err)
				}else{
					resolve(groups)
				}
			})
		});
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

	static getGroupById(data){

		return new Promise((resolve, reject) => {
			db.get(`select * from Groups where id = "${data}"`, (err, group)=>{
				if(err){
					reject(err)
				}else{
					resolve(group)
				}
			})
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

	static addContactGroup(data, cb){
		db.run(`insert into ContactGroup (id_contact, id_group) values ("${data.contact}", "${data.id_group}")`, err=>{
			if(err){
				console.log(err)
			}else{
				cb()
			}
		})
	}
}

module.exports = Group