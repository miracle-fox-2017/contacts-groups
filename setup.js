const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR(20),
    Company VARCHAR(20),
    Telp_number VARCHAR(50),
    Email VARCHAR(50)
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS Groups(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(20)
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS Profiles(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(20),
    password VARCHAR(20)
  )`)
  db.run(`CREATE TABLE IF NOT EXISTS Addresses(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(20),
    city VARCHAR(20),
    zipcode INTEGER
  )`)
  db.run(`ALTER TABLE Profiles ADD id_contact INTEGER(50)
    REFERENCES Contacts(ID) `)
  db.run(`CREATE UNIQUE INDEX IF NOT EXISTS 'id_contact' ON Profiles (id_contact)`)
  // db.run(`SELECT Profiles.ID,Profiles.username,Profiles.password, Contacts.Name FROM Profiles INNER JOIN Contacts ON Profiles.id_contact=Contacts.ID` );
})


db.close()
