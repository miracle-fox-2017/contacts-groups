const sqlite3 = require('sqlite3');
var db        = new sqlite3.Database('./database/database.db');
 
db.serialize( () =>
  {
    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name varchar(25),
              company varchar(25),
              telp_number varchar(25),
              email varchar(50))`);
    db.run(`CREATE TABLE IF NOT EXISTS Groups (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name_of_group varchar(25))`);
    db.run(`CREATE TABLE IF NOT EXISTS Profiles (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username varchar(50),
              password varchar(50))`);
    db.run(`CREATE TABLE IF NOT EXISTS Addresses (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              street varchar (100),
              city varchar(50),
              zipcode varchar(6))`);
    
    db.run(`ALTER TABLE Profiles RENAME TO old_Profiles`);
    db.run(`CREATE TABLE IF NOT EXISTS Profiles (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username varchar(50),
              password varchar(50),
              ContactID INTEGER UNIQUE,
              FOREIGN KEY(ContactID) REFERENCES Contacts(ID))`);
    db.run(`DROP TABLE old_Profiles`);
    
    
    
    db.run(`ALTER TABLE Addresses ADD ContactID INTEGER CONSTRAINT fk REFERENCES Contacts(ID) ON UPDATE CASCADE`);
    db.run(`CREATE UNIQUE INDEX ContactID ON Addresses(ContactID)`);
    
  }
);
db.close();