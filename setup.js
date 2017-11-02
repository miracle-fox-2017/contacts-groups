var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
 
db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS
    Contacts  (id INTEGER PRIMARY KEY AUTOINCREMENT,
              name VARCHAR,
              company VARCHAR,
              telp_number VARCHAR,
              email VARCHAR)`);
  
  db.run(`CREATE TABLE IF NOT EXISTS
      Groups  (id INTEGER PRIMARY KEY AUTOINCREMENT,
              name_of_group VARCHAR)`);
  
  db.run(`CREATE TABLE IF NOT EXISTS
      Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT,
              username VARCHAR,
              password VARCHAR)`);
  
  db.run(`CREATE TABLE IF NOT EXISTS
      Addresses  (id INTEGER PRIMARY KEY AUTOINCREMENT,
                street VARCHAR,
                city VARCHAR,
                zipcode INTEGER)`);
  db.run(`ALTER TABLE Profiles ADD COLUMN id_contacts INTEGER REFERENCES Contacts (id) `)
  
  db.run(`CREATE UNIQUE INDEX 'id_contacts_unique' ON Profiles(id_contacts)`, function(err) {
    console.log(err);
  })
  
  // db.run(`SELECT Profiles.id, Profiles.username, Profiles.password, Contacts.name FROM Profiles INNER JOIN Contacts ON Profiles.id_contacts = Contacts.id`);
  
  db.run(`ALTER TABLE Addresses ADD COLUMN id_contacts INTEGER REFERENCES Contacts (id)`)
  
  // db.run(`SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name FROM Addresses JOIN Contacts ON Addresses.id_contacts = Contacts.id`)
});
 
db.close();