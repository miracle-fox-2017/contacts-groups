const db = require('../component/koneksi')

function create_table(){

	let contact = 
		"CREATE TABLE IF NOT EXISTS Contacts"+
		"(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
		"name TEXT, "+
		"company TEXT, "+
		"telp_number TEXT, "+
		"email TEXT);"

	let group = 
		"CREATE TABLE IF NOT EXISTS Groups"+
		"(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
		"name_of_group TEXT);"

	let profile = 
		"CREATE TABLE IF NOT EXISTS Profile"+
		"(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
		"username TEXT, "+
		"password TEXT);"

	let address = 
		"CREATE TABLE IF NOT EXISTS Addresses"+
		"(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
		"street TEXT, "+
		"city TEXT, "+
		"zipcode INTEGER);"


	db.serialize(()=>{
		db.run(contact, (err)=>{
			// console.log(contact)
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel contact telah dibuat')
			}
			
		});

		db.run(group, (err)=>{
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel group telah dibuat')
			}
		});

		db.run(profile, (err)=>{
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel profile telah dibuat')
			}
		});

		db.run(address, (err)=>{
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel address telah dibuat')
			}
		});

	})

}

function dummy(){
	let contact = "INSERT INTO Contacts (name, company, telp_number, email) VALUES('nama1', 'company1', '013424241', 'nama1@mail.com');"+
		"INSERT INTO Contacts (name, company, telp_number, email) VALUES('nama2', 'company2', '011111111', 'nama2@mail.com');"+
		"INSERT INTO Contacts (name, company, telp_number, email) VALUES('nama3', 'company3', '033333333', 'nama3@mail.com');"

		db.run(contact, (err)=>{
			console.log(contact)
			if(err){
				console.log(err)
			}
			else{
				console.log('insert contact')
			}
		})
}

create_table()
dummy()