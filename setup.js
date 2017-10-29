var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');


db.serialize((err, rows)=>{
  //Contacts
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER primary key  AUTOINCREMENT,
    name TEXT NOT NUll,
    company TEXT,
    telp_number TEXT,
    email TEXT
  )`)
  if(err){
    console.log(err);
  }else{
    console.log('Table had Create');
  }
  // Groups
  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER primary key AUTOINCREMENT,
    name_of_group varchar(20)
  )`)
  if(err){
    console.log(err);
  }else{
    console.log('Table Groups had Create');
  }
  //Profile
  db.run(`CREATE TABLE IF NOT EXISTS Profile (
    id INTEGER primary key AUTOINCREMENT,
    username varchar(20),
    password varchar(10)

  )`)
  if(err){
    console.log(err);
  }else{
    console.log('Table Profile had Create');
  }
  //
  // //Addresses
  db.run(`CREATE TABLE IF NOT EXISTS Addresses (
    id INTEGER primary key AUTOINCREMENT,
    street varchar(20),
    city varchar(20),
    zipcode INTEGER
  )`)
  if(err){
    console.log(err);
  }else{
    console.log('Table Addresses had Create');
  }


  // table conjungtion Many to Many
  db.run(`CREATE TABLE IF NOT EXISTS Contacts_Groups
    (
      id INTEGER primary key AUTOINCREMENT,
      ContactsId INTEGER REFERENCES Contacts('id'),
      GroupsId INTEGER REFERENCES Groups('id')
    )`)
      if(err){
        console.log(err);
      }else{
        console.log('katakan jadi. Horeee')
      }




//  relasi 0ne to One
  db.run(` ALTER TABLE Profile ADD COLUMN ContactId INTEGER REFERENCES Contacts('id')`)
    if(err){
      console.log(err);
    }else{
      console.log('jadi');
    }

    // relasi one to many
    db.run(` ALTER TABLE Addresses ADD COLUMN ContactId INTEGER REFERENCES Contacts('id')`)
      if(err){
        console.log(err);
      }else{
        console.log('addresses tambah');
      }

    // unique index relasi one to one
    db.run(`CREATE UNIQUE INDEX ContactId ON Profile(ContactId)`, ()=>{
      if(err){
        console.log(err);
      }else{
        console.log('jadi unique');
      }
    })


 })

// //tambah record

db.run (`INSERT INTO Contacts_Groups (ContactsId, GroupsId)
 VALUES (1,1), (1,2), (1,3), (2,3), (2,1)`)

// db.run (`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('Jhon Doe', 'Hacktiv8', '081234567', 'jhondoe@rocketmail.com')`)
// db.run (`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('Chandra Buwana', 'Hacktiv8', '0812250927367', 'chandra@rocketmail.com')`)
//
// db.run (`INSERT INTO Groups (name_of_group) VALUES ('Hacktiv8')`)
// db.run (`INSERT INTO Groups (name_of_group) VALUES ('Hack Reacktor')`)
// db.run (`INSERT INTO Groups (name_of_group) VALUES ('Mozzila')`)
//
// db.run(`INSERT INTO Addresses (street, city, zipcode)
//  VALUES ('Jl.Pondok Pinang', 'Jakarta Selatan', 12990)`)
//  db.run(`INSERT INTO Addresses (street, city, zipcode)
//   VALUES ('Jl. Tanah Rata', 'Ambon', 4990)`)
//   db.run(`INSERT INTO Addresses (street, city, zipcode)
//    VALUES ('Jl. Buntu', 'Jakarta Selatan', 7690)`)
//
// //
// //

// SELECT Contacts.name, Groups.name_of_group
// FROM Contacts_Groups
// 	inner join Contacts ON Contacts_Groups.ContactsId = Contacts.id
// 	inner join Groups  ON Contacts_Groups.GroupsId = Groups.id


//    db.run(`INSERT INTO Profile (username, password)
//     VALUES ('azharieazharou', 'ABB12990')`)
//     db.run(`INSERT INTO Profile (username, password)
//      VALUES ('kubalahin', 'A2424da0')`)
