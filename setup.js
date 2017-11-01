var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

db.serialize(()=>{
  
  //set query!!
  let contacts = `CREATE TABLE IF NOT EXISTS Contacts (
                  id          INTEGER PRIMARY KEY AUTOINCREMENT,
                  name        VARCHAR(50) NOT NULL,
                  company     VARCHAR(50),
                  telp_number VARCHAR(20),
                  email       VARCHAR(30)
                  )`;
                  
  let groups   = `CREATE TABLE IF NOT EXISTS Groups (
                  id            INTEGER PRIMARY KEY AUTOINCREMENT,
                  name_of_group VARCHAR(50)
                  )`;
  
  let profile  = `CREATE TABLE IF NOT EXISTS Profile (
                  id       INTEGER PRIMARY KEY AUTOINCREMENT,
                  username VARCHAR(50) NOT NULL UNIQUE,
                  password VARCHAR(50) NOT NULL
                  )`;
                  
  let addresses = `CREATE TABLE IF NOT EXISTS Addresses (
                  id      INTEGER PRIMARY KEY AUTOINCREMENT,
                  street  VARCHAR(50),
                  city    VARCHAR(50),
                  zipcode INTEGER
                  )`;
                  
  //create table!!!              
  db.run(contacts, ()=>{console.log('table Contacts added');});                  
  db.run(groups, ()=>{console.log('table Groups added');});                  
  db.run(profile, ()=>{console.log('table Profile added');});                   
  db.run(addresses, ()=>{console.log('table Addresses added');}); 
  
  
  //release 3
  //tambah coloumn di profile untuk foreign key id_contacts
  let foreignProfile = `ALTER TABLE Profile
                          ADD id_contacts INT
                          CONSTRAINT id_contacts
                          REFERENCES Contacts (id)`;
  
  db.run(foreignProfile, (err)=>{
    console.log('coloumn id_contacts added to Profile');
  
  }); 
  
  //set unique Profile
  let renameProfile = `ALTER TABLE Profile RENAME TO old_table;`
  let crNewProfile = `
                      CREATE TABLE IF NOT EXISTS Profile
                      (
                        id       INTEGER PRIMARY KEY AUTOINCREMENT,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        password VARCHAR(50) NOT NULL,
                        id_contacts INT  UNIQUE
                        CONSTRAINT id_contacts REFERENCES Contacts (id)
                      );`
  let copyDataFromOld = `INSERT INTO Profile SELECT * FROM old_table`;
  let delOldTableProfile = `DROP TABLE old_table`;
  
  db.run(renameProfile);
  db.run(crNewProfile);
  db.run(copyDataFromOld, ()=>{console.log('Profile updated');});
  db.run(delOldTableProfile);
  // db.run(copyDataFromOld, ()=>{console.log('Profile updated');});
  
  //uniqueIndex:
  // let uniqueIndex = `CREATE UNIQUE INDEX IF NOT EXISTS id_contacts ON Profile (id_contacts)`;
  // db.run(uniqueIndex);
  
  
  //release 6
  //buat coloumn id_contacts di Addresses
  let foreignAdresses = `ALTER TABLE Addresses
                          ADD id_contacts INT
                          REFERENCES Contacts (id)`;
  
  db.run(foreignAdresses, (err)=>{
    // console.log(err);
    console.log('coloumn id_contacts added to Addresses');
  }); 
  
  //release 9
  //buat tabel conjunction 
  let contactGroup = `CREATE TABLE IF NOT EXISTS ContactGroup (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        id_groups INT
                        CONSTRAINT id_groups REFERENCES Groups (id),
                        id_contacts INT
                        CONSTRAINT id_contacts REFERENCES Contacts (id)
                      )`;
  db.run(contactGroup, (err)=>{
    // console.log(err);
    console.log('table ContactGroup added');
  }); 
     
})

db.close();