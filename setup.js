var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

function createTable() {
  db.serialize(function() {
    db.run('CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,company TEXT,telp_number TEXT,email TEXT)',err=>{
      if(!err){
        console.log('table Contacts created..');
      }
    });

    db.run('CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY AUTOINCREMENT,name_of_group TEXT)',err=>{
      if(!err){
        console.log('table Groups created..');
      }
    });

    db.run('CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT,username STRING,password STRING)',err=>{
      if(!err){
        console.log('table Profiles created..');
      }
    });

    db.run('CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT,street STRING,city STRING,zipcode INTEGER)',err=>{
      if(!err){
        console.log('table Addresses created..');
      }
    });
  });
}

function alterProfiles() {
  db.run('ALTER TABLE Profiles ADD contact_id INTEGER REFERENCES Contacts(id)', err => {
    if(err){
      console.log(err);
    }
  })
  // add UNIQUE via DB Browser
  // db.run('ALTER TABLE Profiles ADD UNIQUE (contact_id);', err => {
  //   if(err){
  //     console.log(err);
  //   }
  // })
}

function alterAddresses() {
  db.run('ALTER TABLE Addresses ADD contact_id INTEGER REFERENCES Contacts(id)', err => {
    if(err){
      console.log(err);
    }
  })
}

function tableContactsGroups() {
  db.run('CREATE TABLE IF NOT EXISTS ContactsGroups(id INTEGER PRIMARY KEY AUTOINCREMENT,contact_id INTEGER REFERENCES Contacts(id),group_id INTEGER REFERENCES Groups(id))',err=>{
    if(!err){
      console.log('table ContactsGroups created..');
    }
  });
}

// createTable()
// alterProfiles()
// alterAddresses()
tableContactsGroups()
