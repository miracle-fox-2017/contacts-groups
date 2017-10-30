var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../database/person.db');

db.serialize (function() {
  db.run(`CREATE TABLE IF NOT EXISTS Contacts (
    ID Integer PRIMARY KEY AUTOINCREMENT,
    Name varchar(45) NOT NULL UNIQUE,
    Company varchar(50),
    Telp_Number int,
    Email varchar(45));`  );

    db.run(`CREATE TABLE IF NOT EXISTS Grups(
      Id_grup Integer PRIMARY KEY AUTOINCREMENT,
      name_of_group varchar(80)); )`
    );

  db.run(`CREATE TABLE IF NOT EXISTS Profile (
    Id_profile Integer PRIMARY KEY AUTOINCREMENT,
    Username varchar(45) NOT NULL,
    Password varchar(50) NOT NULL);`
   );

  db.run(`CREATE TABLE IF NOT EXISTS Addresses (
    Id_address Integer PRIMARY KEY AUTOINCREMENT,
    Street varchar(50),
    City varchar(50),
    Zipcode Integer);`
  );

  db.run(`CREATE TABLE IF NOT EXISTS GroupContact(
    Id_groupcontact Integer PRIMARY KEY AUTOINCREMENT,
    groupId Integer
    CONSTRAINT FK_groupId REFERENCES Grups(Id_grup) ON UPDATE SET DEFAULT,
    ContactID Integer
    CONSTRAINT FK_ContactsID REFERENCES Contacts(ID) ON UPDATE SET DEFAULT
  )`)

//   db.run(`ALTER TABLE Profile
// DROP FOREIGN KEY FK_ContactsID;`)

  // db.run(`CREATE UNIQUE INDEX ContactID ON Profile(ContactID)`)
  // db.run(`ALTER TABLE Profile ADD ContactID INT
  //   CONSTRAINT FK_ContactsID REFERENCES Contacts(ID) ON UPDATE SET DEFAULT;`)

  // db.run(`ALTER TABLE Profile ADD
  //   CONSTRAINT UQ_ContactsID UNIQUE Contacts(ID) ON UPDATE ACTION;;`)

  db.close();
})
