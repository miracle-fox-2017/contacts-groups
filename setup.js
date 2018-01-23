const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS Contacts(
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	name varchar(20),
    	company varchar(20),
  		telp_number varchar(20),
  		email varchar(20)
  	)`)

	db.run(`CREATE TABLE IF NOT EXISTS Groups(
   	    id INTEGER PRIMARY KEY AUTOINCREMENT,
    	name_of_group varchar(20)
	)`)

	db.run(`CREATE TABLE IF NOT EXISTS Profile(
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
  db.run(`ALTER TABLE Profile ADD COLUMN contact_id int REFERENCES Contacts(id)`, (err) =>{

  })
  db.run(`ALTER TABLE Addresses ADD COLUMN contact_id int REFERENCES Contacts(id)`, (err)=>{
    
  })
});

db.close()