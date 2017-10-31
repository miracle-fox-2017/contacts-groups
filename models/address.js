const db = require('../component/koneksi')

class Addresses{
	constructor(data){
		this.id = data['id']
		this.street = data['street']
		this.city = data['city']
		this.zipcode = data['zipcode']
		this.id_contact = data['id_contact']
	}


	static findAll(){
		let select = "SELECT * FROM Addresses"
		return new Promise(resolve =>{
			db.all(select, (err, rows)=>{
				let address = rows.map(item=>{
					return new Addresses(item)
				})
				resolve(address)
			})
		})
	}

	static findById(sql){
		let select = `SELECT * FROM Addresses WHERE id = ${sql.id}`
			
		return new Promise((resolve, reject) =>{	
			db.all(select, (err, rows)=>{
				if(err){
					reject(err)
				}
				else{
					// let address = rows.map(item =>{
					// 	return new Addresses(item)
					// })
					resolve(rows.pop())
				}
			})	
		})
	}

	static update(sql){
		let update = 
			`UPDATE Addresses SET street = "${sql.street}", `+
			`city = "${sql.city}", `+ 
			`zipcode = "${sql.zipcode}", `+
			`id_contact = "${sql.id_contact}" `+
			`WHERE id = ${sql.id};` 

			console.log(update)

		return new Promise((resolve, reject) => {
			db.run(update, (err)=>{
				if(err){
					reject(err)
				}else{
					resolve('done')
				}
			})
		})
			
	}

	static remove(sql){
		let del  = `DELETE FROM Addresses WHERE id = ${sql.id};`

		console.log(del)

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

	static create(sql){

		let insert = `INSERT INTO Addresses (street, city, zipcode, id_contact) VALUES `+
			`("${sql.street}", `+
			`"${sql.city}", `+
			`"${sql.zipcode}",`+
			`${sql.id_contact});`

			
		return new Promise((resolve, reject)=>{
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

module.exports = Addresses
