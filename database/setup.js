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
      console.log('Failed create table Contacts');
    } else {
      console.log('Success create table Contacts');
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group STRING)`, (err) => {
    if(err) {
      console.log('Failed create table Groups');
    } else {
      console.log('Success create table Groups');
    }
  })

  db.run(`CREATE TABLE IF NOT EXISTS Profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username STRING,
    password STRING)`, (err) => {
    if(err) {
      console.log('Failed create table Profiles');
    } else {
      console.log('Success create table Profiles');
    }
  })

  db.run(`CREATE TABLE IF NOT EXISTS Addresses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street STRING,
    city STRING,
    zipcode STRING)`, (err) => {
    if(err) {
      console.log('Failed create table Addresses');
    } else {
      console.log('Success create table Addresses');
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

  // db.run(`ALTER TABLE Profiles ADD contactId INTEGER REFERENCES Contacts(id)`, (err) => {
  //   if(err) {
  //     console.log('Failed add column contactId');
  //   } else {
  //     console.log('Success add column contactId');
  //   }
  // })
  //
  // db.run(`CREATE UNIQUE INDEX contactId ON Profiles (contactId)`, (err) => {
  //   if(err) {
  //     console.log('Failed create unique index contactId');
  //   } else {
  //     console.log('Success create unique index contactId');
  //   }
  // })

  // db.run(`ALTER TABLE Addresses ADD contactId INTEGER REFERENCES Contacts(id)`, (err) => {
  //   if(err) {
  //     console.log('Failed add column contactId');
  //   } else {
  //     console.log('Success add column contactId');
  //   }
  // })

  db.run(`CREATE TABLE IF NOT EXISTS contactsGroups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contactId INTEGER REFERENCES Contacts(id),
    groupId INTEGER REFERENCES Groups(id))`, (err) => {
      if(err) {
        console.log('Failed create table contactsGroups');
      } else {
        console.log('Success create table contactsGroups');
      }
    })
});

db.close();
