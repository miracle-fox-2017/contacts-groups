const db = require('../component/koneksi')

class Addresses{

	static read(cb){
		let select = "SELECT * FROM Addresses"
		let data = []
		db.all(select, (err, rows)=>{
			cb(rows)
		})
	}

	static select_by_id(sql, cb){
		let select = `SELECT * FROM Addresses WHERE id = ${sql.id}`
			
		db.all(select, (err, rows)=>{
			rows.forEach(item =>{
				cb(item)
			})
			
		})	
	}

	static update(sql, cb){
		let update = 
			`UPDATE Addresses SET street = "${sql.street}", `+
			`city = "${sql.city}", `+ 
			`zipcode = "${sql.zipcode}", `+
			`id_contact = "${sql.id_contact}" `+
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
		let del  = `DELETE FROM Addresses WHERE id = ${sql.id};`

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

		let insert = `INSERT INTO Addresses (street, city, zipcode, id_contact) VALUES `+
			`("${sql.street}", `+
			`"${sql.city}", `+
			`"${sql.zipcode}",`+
			`${sql.id_contact});`

			// console.log(sql)
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

module.exports = Addresses
