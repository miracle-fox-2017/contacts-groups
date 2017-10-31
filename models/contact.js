const db = require('../component/koneksi')

class Contact{
	constructor(data){
		this.id = data['id']
		this.name = data['name']
		this.company = data['company']
		this.telp_number = data['telp_number']
		this.email = data['email']
	}

	static findAll(){
		let select = "SELECT * FROM Contacts"

		return new Promise(resolve =>{
			db.all(select, (err, rows)=>{
				let contact = rows.map(item =>{
					return new Contact(item)
				})
				resolve(contact)
			})
		})
	}

	static findById(sql){
		let select = `SELECT * FROM Contacts WHERE id = ${sql}`
		
		new Promise((resolve, reject)=>{
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
			`UPDATE Contacts SET name = "${sql.name}", `+
			`company = "${sql.company}", `+ 
			`telp_number = "${sql.telp_number}", `+
			`email = "${sql.email}" ` +
			`WHERE id = ${sql.id};` 

			new Promise((resolve, reject)=>{ 
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

	static remove(sql){
		let del  = `DELETE FROM Contacts WHERE id = ${sql.id};`

		new Promise((resolve, reject)=>{ 
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

	static create(sql){

		let insert = `INSERT INTO Contacts (name, company, telp_number, email) VALUES `+
			`("${sql.name}", `+
			`"${sql.company}", `+
			`"${sql.telp_number}", `+
			`"${sql.email}");`

		new Promise((resolve, reject)=>{ 
			db.run(insert, function(err){
				if(err){
					reject(err)
				}
				else{
	
					resolve(this)
				}
			})

		})	
			
	}
}

module.exports = Contact
