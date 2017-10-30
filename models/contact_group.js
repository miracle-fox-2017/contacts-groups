const db = require('../component/koneksi')

class ContactGroup{
	
	static read(cb){
		let select = "SELECT * FROM Contacts_Groups"
		db.all(select, (err, rows)=>{
			cb(rows)
		})
	}


	static insert(sql, cb){

		let insert = `INSERT INTO Contacts_Groups (id_contact, id_group) VALUES `+
			`("${sql.id_contact}", `+
			`"${sql.id_group}");`

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

module.exports = ContactGroup
