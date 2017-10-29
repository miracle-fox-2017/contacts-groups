const db = require('../component/koneksi')

class Profile{
	
	static read(cb){
		let select = "SELECT * FROM Profile"
		let data = []
		db.all(select, (err, rows)=>{
			cb(rows)
		})
	}

	static select_by_id(sql, cb){
		let select = `SELECT * FROM Profile WHERE id = ${sql.id}`
			
		db.all(select, (err, rows)=>{
			rows.forEach(item =>{
				cb(item)
			})
			
		})	
	}

	static update(sql, cb){
		let update = 
			`UPDATE Profile SET username = "${sql.username}", `+
			`password = "${sql.password}", `+ 
			`id_contact = ${sql.id_contact} `+
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

	static delete(sql, cb){
		let del  = `DELETE FROM Profile WHERE id = ${sql.id};`

		console.log(del)

		db.run(del, (err)=>{
			if(err){
				console.log(err)
			}
			else{
				cb('data sudah didelete')
			}
		}) 
	}

	static insert(sql, cb){

		let	insert = '',
			username = sql.username,
			password = sql.password,
			id_contact = sql.id_contact,
			error = {
				is_error : false,
				status : ''
			}

		if(username.length == 0){

			error = {
				is_error : true,
				status : 'username tidak boleh kosong'
			}

			return cb(error)
		}
		else if(password.length == 0){
			error = {
				is_error : true,
				status : 'password tidak boleh kosong'
			}
			return cb(error)
		}
		else if(id_contact.length == 0){
			error = {
				is_error : true,
				status : 'contact tidak boleh kosong'
			}
			return cb(error)
		}
		else{

		insert = `INSERT INTO Profile (username, password, id_contact) VALUES `+
			`("${username}", `+
			`"${password}", `+
			`${id_contact});`
		}

			console.log(insert)
			db.run(insert, (err)=>{
				if(err){
					console.log(err)
				}
				else{
					 cb('berhasil insert')
				}
			})
			
	}

}

module.exports = Profile
