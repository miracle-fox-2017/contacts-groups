const db = require('../component/koneksi')

class Contact{
	constructor(data){
		this.id = data['id']
		this.name = data['name']
		this.company = data['company']
		this.telp_number = data['telp_number']
		this.email = data['email']
	}
	
	static read(cb){
		let select = "SELECT * FROM Contacts"
		let data = []
		db.all(select, (err, rows)=>{
			cb(rows)
		})
	}

	static select_by_id(sql, cb){
		let select = `SELECT * FROM Contacts WHERE id = ${sql}`
		console.log(select)
			
		db.all(select, (err, rows)=>{
			rows.forEach(item =>{
				cb(item)
			})
			
		})	
	}

	static update(sql, cb){
		let update = 
			`UPDATE Contacts SET name = "${sql.name}", `+
			`company = "${sql.company}", `+ 
			`telp_number = "${sql.telp_number}", `+
			`email = "${sql.email}" ` +
			`WHERE id = ${sql.id};` 

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
		let del  = `DELETE FROM Contacts WHERE id = ${sql.id};`

		console.log(del)

		db.run(del, (err)=>{
			if(err){
				console.log(err)
			}
			else{
				return 'data sudah didelete'
			}
		}) 
	}
}

module.exports = Contact
