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

	static getAllGroupContact(cb){
		db.all(`select G.id, G.name_of_group, C.name from Groups as G left join ContactGroup as CG on G.id = CG.id_group left join Contacts as C on CG.id_contact = C.id`, (err, groups)=>{
			if(err){
				console.log(err)
			}else{
				cb(groups)
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