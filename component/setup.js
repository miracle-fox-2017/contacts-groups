var sqlite3 = require('sqlite3').verbose();
var db2 = new sqlite3.Database('./db/tabel.db');

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


	db2.serialize(()=>{
		db2.run(contact, (err)=>{
			// console.log(contact)
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel contact telah dibuat')
			}
			
		});

		db2.run(group, (err)=>{
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel group telah dibuat')
			}
		});

		db2.run(profile, (err)=>{
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel profile telah dibuat')
			}
		});

		db2.run(address, (err)=>{
			if(err){
				console.log('data error', err)
			}
			else{
				console.log('tabel address telah dibuat')
			}
		});

	})

}

function dummy_contact(){
	let contact = "INSERT INTO Contacts (name, company, telp_number, email) VALUES('nama1', 'company1', '013424241', 'nama1@mail.com');"

		db2.run(contact, (err)=>{
			console.log(contact)
			if(err){
				console.log(err)
			}
			else{
				console.log('insert contact')
			}
		})
}

function dummy_group(){
	let contact = "INSERT INTO Groups (name_of_group) VALUES('miracle fox');"
	let contact2 = "INSERT INTO Groups (name_of_group) VALUES('lively fox');"

		db2.run(contact, (err)=>{
			console.log(contact)
			if(err){
				console.log(err)
			}
			else{
				console.log('insert group')
			}
		})

		db2.run(contact2)
}

function dummy_address(){
	let address = "INSERT INTO Addresses (street, city, zipcode, id_contact) VALUES('Jl. Pondok Indah', 'Jaksel', 12345, 1);"
	let address2 = "INSERT INTO Addresses (street, city, zipcode, id_contact) VALUES('Jl. Bekasi Utara', 'Bekasi', 14567, 1);"

		db2.run(address, (err)=>{
			if(err){
				console.log(err)
			}
			else{
				console.log('insert group')
			}
		})

		db2.run(address2)
}

function dummy_profile(){
	let profile = "INSERT INTO Profile (username, password, id_contact) VALUES('tes', 'tes123', 1);"
	let profile2 = "INSERT INTO Profile (username, password, id_contact) VALUES('admin', 'admin', 3);"

		db2.run(profile, (err)=>{
			if(err){
				console.log(err)
			}
			else{
				console.log('insert profile')
			}
		})

		db2.run(profile2)
}

function foreign_kontak_profile(){
	let alter = "ALTER TABLE Profile ADD COLUMN id_contact INTEGER REFERENCES Contacts(id);"

	db2.run(alter,(err)=>{
		if(err){
			console.log('ini error', err)
		}
		else{
			console.log('berhasil foreign')
		}
	})
}

function add_unique(){
	let unique = 'CREATE UNIQUE INDEX '

	db2.run(unique,(err)=>{
		if(err){
			console.log('ini error', err)
		}
		else{
			console.log('berhasil unique')
		}
	})
}

function drop_table(){
	let drop = 'DROP TABLE Profile'

	db2.run(drop, (err)=>{
		if(err){
			console.log(err)
		}
		else{
			console.log('berhasil drop')
		}
	})
}


function foreign_kontak_address(){
	let alter = "ALTER TABLE Addresses ADD COLUMN id_contact INTEGER REFERENCES Contacts(id);"

	db2.run(alter,(err)=>{
		if(err){
			console.log('ini error', err)
		}
		else{
			console.log('berhasil foreign address')
		}
	})
}

function conjunction_mto_many(){
	let create = "CREATE TABLE IF NOT EXISTS Contacts_Groups "+
		"(id INTEGER PRIMARY KEY AUTOINCREMENT);",

		drop = "DROP TABLE Contacts_Groups",

		alter_contact = "ALTER TABLE Contacts_Groups ADD COLUMN id_contact INTEGER REFERENCES Contacts(id);",

		alter_group = "ALTER TABLE Contacts_Groups ADD COLUMN id_group INTEGER REFERENCES Groups(id);"



		db2.run(create,(err)=>{
		if(err){
			console.log('ini error', err)
		}
		else{
			console.log('berhasil create')
		}
	})

		db2.run(alter_contact)
		db2.run(alter_group)
}

function add_foreign_conj(){

}

// create_table()
// dummy_contact()
// dummy_group()
// dummy_address()
// dummy_profile()
// foreign_kontak_profile()
// add_unique()
// drop_table()
// foreign_kontak_address()
conjunction_mto_many()