const db = require('../component/koneksi')

class Group{
	constructor(data){
		this.id = data['id']
		this.name_of_group = data['name_of_group']
	}
	
	static findAll(){
		let select = "SELECT * FROM Groups"

		return new Promise((resolve, reject)=> {
			db.all(select, (err, rows)=>{
				if(err){
					reject(err)
				}
				else{
					let group = rows.map(item => {
						return new Group(item)
					})
					resolve(group)
				}
			})
		})
		
	}

	static findById(sql){
		let select = `SELECT * FROM Groups WHERE id = ${sql.id}`
			
		return new Promise((resolve, reject)=> {
			db.all(select, (err, rows)=>{
				if(err){
					reject(err)
				}
				else{
					resolve(rows.pop())
				}
			})
				
		})	
		
	}

	static update(sql, cb){
		let update = 
			`UPDATE Groups SET name_of_group = "${sql.name_of_group}" `+
			`WHERE id = ${sql.id};`

			console.log(update) 

			db.run(update, (err)=>{
				if(err){
					console.log(err)
				}
				else{
					cb('data sudah di update')
				}
			})
	}

	static remove(sql, cb){
		let del  = `DELETE FROM Groups WHERE id = ${sql.id};`

		return new Promise((resolve, reject)=> {
			db.run(del, (err)=>{
				if(err){
					reject(err)
				}
				else{
					resolve('data sudah didelete')
				}
			}) 
		})
		
	}
}

module.exports = Group
