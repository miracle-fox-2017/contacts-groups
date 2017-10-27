const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT UNIQUE, email TEXT UNIQUE)');
  // console.log('table contact created');

  db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)');
  // console.log('table group created');

  db.run('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT UNIQUE)');
  // console.log('table profile created');

  db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)');
  // console.log('table addresses created');

  // db.run('DROP TABLE Addresses;')
});

db.close();
/*Structure table:

Contacts:
attribute id ber-type integer
attribute name ber-type string
attribute company ber-type string
attribute telp_number ber-type string
attribute email ber-type string
Groups:
attribute id ber-type integer
attribute name_of_group ber-type string
Profile:
attribute id ber-type integer
attribute username ber-type string
attribute password ber-type string
Addresses:
attribute id ber-type integer
attribute street ber-type string
attribute city ber-type string
attribute zipcode ber-type integer*/
