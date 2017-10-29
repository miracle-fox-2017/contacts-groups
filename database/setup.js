var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    company STRING,
    telp_number STRING,
    email STRING)`, (err) => {
    if(err) {
      console.log('Failed create database Contacts');
    } else {
      console.log('Success create database Contacts');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group STRING)`, (err) => {
    if(err) {
      console.log('Failed create database Groups');
    } else {
      console.log('Success create database Groups');
    }
  })

  db.run(`CREATE TABLE IF NOT EXISTS Profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username STRING,
    password STRING)`, (err) => {
    if(err) {
      console.log('Failed create database Profiles');
    } else {
      console.log('Success create database Profiles');
    }
  })

  db.run(`CREATE TABLE IF NOT EXISTS Addresses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street STRING,
    city STRING,
    zipcode STRING)`, (err) => {
    if(err) {
      console.log('Failed create database Addresses');
    } else {
      console.log('Success create database Addresses');
    }
  })

  // db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES
  //   ('Zuhri Nurhuda', 'Hacktiv8', '085258588122', 'zuhri.nurhuda@gmail.com'),
  //   ('Davina Bonadilla', 'Athfaal Stuff', '085123456789', 'davina.bonadilla@gmail.com'),
  //   ('Asiyah Asyaima', 'Muslimah Stuff', '085987654321', 'asiyah.asyaima@gmail.com')`, (err) => {
  //   if(err) {
  //     console.log('Failed insert data Contacts');
  //   } else {
  //     console.log('Success insert data Contacts');
  //   }
  // })

  db.run(`ALTER TABLE Profiles ADD contactId INTEGER REFERENCES Contacts(id)`, (err) => {
    if(err) {
      console.log('Failed add column contactId');
    } else {
      console.log('Success add column contactId');
    }
  })

  db.run(`CREATE UNIQUE INDEX contactId ON Profiles (contactId)`, (err) => {
    if(err) {
      console.log('Failed create unique index contactId');
    } else {
      console.log('Success create unique index contactId');
    }
  })

  // db.all(`SELECT * FROM Contacts`, (err, rows) => {
  //   console.log(rows);
  // })
});

db.close();
