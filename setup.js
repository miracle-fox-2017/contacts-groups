<<<<<<< HEAD
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

db.serialize(function(){
  db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(20), company TEXT, telp_number varchar(20) , email varchar(50) )");
  db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group varchar(20) )");
  db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(20), password vachar(20))");
  db.run("CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street varchar(30), city varchar(10), zipcode INTEGER)");
  db.run(`ALTER TABLE Profile ADD COLUMN contacts_id INTEGER REFERENCES Contacts (id)`)
  db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idContact ON Profile (contacts_id)`)
  db.run(`ALTER TABLE Addresses add COLUMN contacts_id INTEGER REFERENCES Contacts (id)`)
})

let createUniqe = `CREATE UNIQUE INDEX contacts_id_unique ON Profiles(id_contacts)`;

  let foreignProfile = `ALTER TABLE Profile
                          ADD COLUMN id_contacts INTEGER
                          FOREIGNKEY id_contacts
                          REFERENCES Contacts (id)`;



  db.run(createUniqe,(err)=>{
     console.log('log')
  });


db.close()
=======
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	name varchar(50),
    	company varchar(50),
  		telp_number varchar(20),
  		email varchar(30)
  	)`)

	db.run(`CREATE TABLE IF NOT EXISTS Groups (
   	    id INTEGER PRIMARY KEY AUTOINCREMENT,
    	name_of_group varchar(20)
	)`)

	db.run(`CREATE TABLE IF NOT EXISTS Profile (
   	    id INTEGER PRIMARY KEY AUTOINCREMENT,
        username varchar(20),
        password varchar(20)
	)`)

	db.run(`CREATE TABLE IF NOT EXISTS Addresses (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	street varchar(50),
    	city varchar(20),
    	zipcode int
	)`)

// Tabel Contacts dan Table Profiles memiliki relasi dimana satu data contact hanya boleh memiliki satu data profile. 
// Pada file setup.js tambahkan column relasi foreign key dan tentukan di tabel mana foreign key tersebut ditambahkan (hint: gunakan alter table)
// 2. Tentukan (jika ada dan perlu) column mana saja yang harus di set UNIQUE (baca dokumentasi sqlite3 untuk menambahkan unique pada existing table)

	db.run(`ALTER TABLE Profile ADD COLUMN contact_id int REFERENCES Contacts(id)`, (err) => {
		
		  })
	db.run(`ALTER TABLE Addresses ADD COLUMN contact_id int REFERENCES Contacts(id)`, (err)=> {
			
		})
	}); 

db.close()

>>>>>>> dd1f5f7444961c932261fef791375f68bf1f96d5
