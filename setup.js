const sqlite3 = require('sqlite3');
var db        = new sqlite3.Database('./database/database.db');
 
db.serialize( () =>
  {
    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
              ID INTEGER PRIMARY KEY,
              name varchar(25),
              company varchar(25),
              telp_number varchar(25),
              email varchar(50))`);
    db.run(`CREATE TABLE IF NOT EXISTS Groups (
              ID INTEGER PRIMARY KEY,
              name_of_group varchar(25))`);
    db.run(`CREATE TABLE IF NOT EXISTS Profiles (
              ID INTEGER PRIMARY KEY,
              username varchar(50),
              password varchar(50))`);
    db.run(`CREATE TABLE IF NOT EXISTS Addresses (
              ID INTEGER PRIMARY KEY,
              street varchar (100),
              city varchar(50),
              zipcode varchar(6))`);
    db.run(`ALTER TABLE Profiles ADD COLUMN ContactID INTEGER REFERENCES Contacts (ID) ON UPDATE CASCADE`);
    db.run(`CREATE UNIQUE INDEX IF NOT EXISTS ContactID on Contacts (ID)`);
    db.run(`CREATE UNIQUE INDEX IF NOT EXISTS GroupID on Groups (ID)`);
    db.run(`CREATE UNIQUE INDEX IF NOT EXISTS ProfileID on Profiles (ID)`);
    db.run(`CREATE UNIQUE INDEX IF NOT EXISTS AddressID on Addresses (ID)`);
  }
);
 
db.close();