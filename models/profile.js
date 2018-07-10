const db = require('../component/koneksi')

class Profile{
	constructor(data){
		this.id = data['id']
		this.username = data['username']
		this.password = data['password']
		this.id_contact = data['id_contact']
	}

	static findAll(){
		let select = "SELECT * FROM Profile"

		return new Promise((resolve, reject)=> {
			db.all(select, (err, rows)=>{
				if(err){
					reject(err)
				}
				else{
					let profile = rows.map(item =>{
						return new Profile(item)
					})
					resolve(profile)
				}
			})

		})		
	}

	static findById(sql){
		let select = `SELECT * FROM Profile WHERE id = ${sql.id}`
			
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

	static update(sql){
		let update = 
			`UPDATE Profile SET username = "${sql.username}", `+
			`password = "${sql.password}", `+ 
			`id_contact = ${sql.id_contact} `+
			`WHERE id = ${sql.id};` 
			console.log(update)

		return new Promise((resolve, reject)=> { 
			db.run(update, (err)=>{
				if(err){
					reject(err)
				}
				else{
					resolve('data sudah di update')
				}
			})
		})
	}

	static remove(sql, cb){
		let del  = `DELETE FROM Profile WHERE id = ${sql.id};`


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

	static create(sql, cb){

		let	insert = '',
			username = sql.username,
			password = sql.password,
			id_contact = sql.id_contact,
			error = {
				is_error : false,
				status : ''
			}

		return new Promise((resolve, reject)=>{

			if(username.length == 0){

				error = {
					is_error : true,
					status : 'username tidak boleh kosong'
				}

				return reject(error)
			}
			else if(password.length == 0){
				error = {
					is_error : true,
					status : 'password tidak boleh kosong'
				}
				return reject(error)
			}
			else if(id_contact.length == 0){
				error = {
					is_error : true,
					status : 'contact tidak boleh kosong'
				}
				return reject(error)
			}
			else{

			insert = `INSERT INTO Profile (username, password, id_contact) VALUES `+
				`("${username}", `+
				`"${password}", `+
				`${id_contact});`
			}

			db.run(insert, (err)=>{
				if(err){
					reject(err)
				}
				else{
					 resolve('berhasil insert')
				}
			})
		})	
	}
}

module.exports = Profile
