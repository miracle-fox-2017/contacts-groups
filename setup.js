var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

db.serialize(()=>{
  
  //set query!!
  let contacts = `CREATE TABLE IF NOT EXISTS Contacts (
                  id          INTEGER     PRIMARY KEY,
                  name        VARCHAR(50) NOT NULL,
                  company     VARCHAR(50),
                  telp_number VARCHAR(20),
                  email       VARCHAR(30)
                  )`;
                  
  let groups   = `CREATE TABLE IF NOT EXISTS Groups (
                  id            INTEGER     PRIMARY KEY,
                  name_of_group VARCHAR(50)
                  )`;
  
  let profile  = `CREATE TABLE IF NOT EXISTS Profile (
                  id       INTEGER     PRIMARY KEY,
                  username VARCHAR(50) NOT NULL UNIQUE,
                  password VARCHAR(50) NOT NULL
                  )`;
                  
  let addresses = `CREATE TABLE IF NOT EXISTS Addresses (
                  id      INTEGER      PRIMARY KEY,
                  street  VARCHAR(50),
                  city    VARCHAR(50),
                  zipcode VARCHAR(10)
                  )`;
  
  //create table!!!              
  db.run(contacts);                  
  db.run(groups);                  
  db.run(profile);                  
  db.run(addresses);
  
})

db.close();