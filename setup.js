const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')


db.serialize(function () {
  //dibawah ini tabel Contacts
    db.run(`CREATE TABLE IF NOT EXISTS Contacts(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(32) ,
      company VARCHAR(50),
      telp_number VARCHAR(13),
      email VARCHAR(50)
    )`);

    //dibawah ini tabel Groups
      db.run(`CREATE TABLE IF NOT EXISTS Groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_of_group VARCHAR(50)
        )`);

      //dibawah ini tabel Profile
      db.run(`CREATE TABLE IF NOT EXISTS Profile(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50),
        password VARCHAR(8)
        )`);

      //dibawah ini tabel Addresses
      db.run(`CREATE TABLE IF NOT EXISTS Addresses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        street VARCHAR(100),
        city VARCHAR(50),
        zipcode VARCHAR(50)
        )`);

        //relasi
      // db.run(`ALTER TABLE Profile ADD COLUMN contacts_id INTEGER REFERENCES Contacts(id)`);
        db.run(`CREATE UNIQUE INDEX IF NOT EXISTS contacts_id ON Profile(contacts_id)`)

          db.run(`ALTER TABLE Addresses ADD COLUMN contacts_id INTEGER REFERENCES Contacts(id)`);



})
db.close()
