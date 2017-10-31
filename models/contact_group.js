const db = require('../component/koneksi')

class ContactGroup{
	constructor(data){
		this.id_contact = data['id_contact']
		this.id_group = data['id_group']
	}
	
	static findAll(){
		let select = "SELECT * FROM Contacts_Groups"

		return new Promise((resolve, reject) => {
			db.all(select, (err, rows)=>{
				if(err){
					reject(err)
				}
				else{
					let cg = rows.map(item =>{
						return new ContactGroup(item)
					})

					resolve(cg)
				}
			})
		})
	}


	static create(sql){

		let insert = `INSERT INTO Contacts_Groups (id_contact, id_group) VALUES `+
			`("${sql.id_contact}", `+
			`"${sql.id_group}");`

			return new Promise((resolve, reject) => {
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

module.exports = ContactGroup
