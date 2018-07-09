const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

db.serialize(function () {
  // db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT UNIQUE, email TEXT UNIQUE)');
  // // console.log('table contact created');
  //
  // db.run('CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)');
  // // console.log('table group created');
  //
  // db.run('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT UNIQUE)');
  // console.log('table profile created');
  //
  // db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)');
  // // console.log('table addresses created');

  // db.run('CREATE TABLE IF NOT EXISTS ContactsGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, ContactId INTEGER REFERENCES Contacts(id) ON DELETE CASCADE, GroupId INTEGER REFERENCES Groups(id) ON DELETE CASCADE)');
  // console.log('table ContactsGroups created');

  // db.run('DROP TABLE Profile;')
  // console.log('table has been deleted');
});

// db.close();

function alterContactsProfiles() {
  db.run(`ALTER TABLE Profile ADD COLUMN ContactId INTEGER REFERENCES Contacts(id) ON DELETE CASCADE`, (err) => {
    if (!err) {
      console.log('tabel berhasil ditambah');
    } else {
      console.log(err);
    }
  });
}

function alterUnique() {
  db.run(`CREATE UNIQUE INDEX contactId_unique ON Profile(ContactId)`, (err) => {
    if (!err) {
      console.log('tabel berhasil ditambah');
    } else {
      console.log(err);
    }
  });
}

function contactNotNull() {
  db.run(`CREATE INDEX name_notNull ON Contacts(id) WHERE NOT NULL`, (err) => {
    if (!err) {
      console.log('tabel berhasil ditambah');
    } else {
      console.log(err);
    }
  });
}

function alterContactsAddresses() {
  db.run(`ALTER TABLE Addresses ADD COLUMN ContactId INTEGER REFERENCES Contacts(id)`, (err) => {
    if (!err) {
      console.log('tabel berhasil ditambah');
    } else {
      console.log(err);
    }
  });
}

// function createContact() {
//   db.run("INSERT INTO Contacts VALUES (1, 'Ian', 'Hacktiv8', '0812999999', 'christian@yahoo.com')");
//
//   console.log('data created');
// }

// function createContactGroup() {
//   db.run("INSERT INTO ContactsGroups VALUES (1, 1, 4)");
//
//   console.log('data created');
// }
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

// createContact();
// alterContactsProfiles();
// alterUnique()
// contactNotNull()
// alterContactsAddresses()
// createContactGroup()
