const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')


db.serialize(function () {
  //dibawah ini tabel Contacts
    db.run(`CREATE TABLE IF NOT EXISTS Contacts(
      id INTEGER,
      name VARCHAR(32) ,
      company VARCHAR(50),
      telp_number VARCHAR(13),
      email VARCHAR(50)
    )`);

    //dibawah ini tabel Groups
      db.run(`CREATE TABLE IF NOT EXISTS Groups(
        id INTEGER,
        name_of_group VARCHAR(50)
        )`);

      //dibawah ini tabel Profile
      db.run(`CREATE TABLE IF NOT EXISTS Profile(
        id INTEGER,
        username VARCHAR(50),
        password VARCHAR(8)
        )`);

      //dibawah ini tabel Addresses
      db.run(`CREATE TABLE IF NOT EXISTS Addresses(
        id INTEGER,
        street VARCHAR(100),
        city VARCHAR(50),
        zipcode VARCHAR(50)
        )`);

})
db.close()
