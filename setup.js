const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', err => {
  if (err) console.log(err);;
});
 
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    telp_number VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(255)
  )`, err => {
    if (err) console.log(err);;
    console.log(`Created Table Contacts`);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS Groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(30) NOT NULL
  )`, err => {
    if (err) console.log(err);;
    console.log(`Created Table Groups`);
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS Addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    zipcode VARCHAR(30)
  )`, err => {
    if (err) console.log(err);;
    console.log(`Created Table Addresses`);
  });
  
  db.run(`
    CREATE TABLE IF NOT EXISTS Profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
  )`, err => {
    if (err) console.log(err);;
    console.log(`Created Table Profile`);
  });

  db.run(`
    ALTER TABLE Profile
    ADD COLUMN id_contact INTEGER
    REFERENCES Contacts (id)
  `, err => {
    if (err) console.log(err);;
    console.log(`Created column id_contact in Profile`);
  });

  db.run(`
    CREATE UNIQUE INDEX id_contact
    ON Profile (id_contact)`, err => {
      if (err) console.log(err);
      console.log(`Created unique id_contact on Profile`);
    }
  );

  db.run(`
    ALTER TABLE Addresses
    ADD COLUMN id_contact INTEGER
    REFERENCES Contacts (id)
  `), err => {
    if (err) console.log(err);
    console.log(`Created column id_contact in Addresses`);
  };
});
 
db.close();