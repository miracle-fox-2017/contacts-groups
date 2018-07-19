const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT UNIQUE)");
  db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT UNIQUE)");
  db.run("CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER UNIQUE)");
  db.run("CREATE TABLE IF NOT EXISTS Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, ContactsId INTEGER REFERENCES Contacts('id'), GroupsId INTEGER REFERENCES Groups('id'))");
});
function ContactsToProfile() {
  let query = "ALTER TABLE Profile ADD COLUMN ContactsId INTEGER REFERENCES Contacts('id')";
  db.run(query,(err)=>{
    if(!err){
      console.log('Tabel berhasil di tambah');
    } else {
      console.log(err);
    }
  })
}
function setUniqueContactId() {
  let query = "CREATE UNIQUE index contactsUnique on Profile(ContactsId)";
  db.run(query,(err)=>{
    if(!err){
      console.log('Kolom di ContactsId berhasil di set Unique');
    } else {
      console.log(err);
    }
  })
}
function ContactsToAddresses() {
  let query = "ALTER TABLE Addresses ADD COLUMN ContactsId INTEGER REFERENCES Contacts('id')";
  db.run(query,(err)=>{
    if(!err){
      console.log('Tabel berhasil di tambah ke Tabel Addresses');
    } else {
      console.log(err);
    }
  })
}

// ContactsToProfile()
// setUniqueContactId()
// ContactsToAddresses()
db.close();
