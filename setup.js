var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), company VARCHAR(20),
        telp VARCHAR(15), email VARCHAR(20) )`,() => {
          console.log('create contacts sukses');
        })

  db.run(`CREATE TABLE IF NOT EXISTS Groups(
    id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(20) )`,()=>{
      console.log('create EXISTS Groups sukses');
    })

  db.run(`CREATE TABLE IF NOT EXISTS Profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT , Username VARCHAR(20), password VARCHAR(20) ) `,()=>{
      console.log('create EXISTS Profile sukses');
    })

  db.run(`CREATE TABLE IF NOT EXISTS Addresses(
      id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(20),
      city VARCHAR(20), zipcode INTEGER(3) )`,()=>{
      console.log('create EXISTS Addresses sukses');
    })
});
//
// function queryProfile(){
//   let query=`ALTER TABLE Profiles ADD COLUMN Contactsid INTEGER REFERENCES Contacts(id)`
//   db.run(query, (err)=>{
//     console.log('Alter bERHASIL');
//   })
// }
// queryProfile()

// SELECT Profile * , Contacts.name FROM Profile LEFT
// JOIN Contacts ON
// Profiles.Contactsid = Contacts.id ORDER BY Profile.id


 function queryAddressContact(){
   let query=`ALTER TABLE Addresses ADD COLUMN idContacts INTEGER REFERENCES Contacts(id)`
   db.run(query,(err)=>{
     console.log('Alter Address Contact Berhasil');
   })
 }
  queryAddressContact()

 function uniqueProfile(){
   let  query=`CREATE UNIQUE INDEX Contactsid ON Profiles(Contactsid)`
   db.run(query,()=>{
     console.log("Alter Unique Berhasil;");
   })
 }
 uniqueProfile()
