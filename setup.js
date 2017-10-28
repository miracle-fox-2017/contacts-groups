var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');


db.serialize((err, rows)=>{
  //Contacts
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER primary key  AUTOINCREMENT,
    name TEXT,
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
  // // //Addresses
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
})

//tambah record
db.run (`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('Jhon Doe', 'Hacktiv8', '081234567', 'jhondoe@rocketmail.com')`)
db.run (`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('Chandra Buwana', 'Hacktiv8', '0812250927367', 'chandra@rocketmail.com')`)

db.run (`INSERT INTO Groups (name_of_group) VALUES ('Hacktiv8')`)
db.run (`INSERT INTO Groups (name_of_group) VALUES ('Hack Reacktor')`)
db.run (`INSERT INTO Groups (name_of_group) VALUES ('Mozzila')`)
