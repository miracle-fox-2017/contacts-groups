const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./addresses')

class Addresses {
  static findAll(callback) {
    db.all(`SELECT * FROM Addresses`, (err, addresses) => {
      callback(err, addresses)
    })
  }

  static findByid(id, callback) {
    db.all(`SELECT * FROM Addresses WHERE id = "${id}"`)
  }

  static findAllwithContact(callback) {
    db.all(`SELECT Addresses.id, Addresses.street, Addresses.zipcode, Addresses.ContactId, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id ORDER BY Addresses.ContactId`, (err, addresses) => {
      callback(err, addresses)
    })
  }

  static findAllwithContactById(id, callback) {
    db.all(`SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id WHERE Addresses.id = "${id}"`, (err, addresses) => {
      callback(err, addresses)
    })
  }

  static findWhere(name, value, callback) {
    db.all(`SELECT * FROM Addresses WHERE ${name} = '${value}'`, (err, addresses) => {
      callback(err, addresses)
    })
  }

  static create(body, callback) {
    db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ("${body.street}", "${body.city}", "${body.zipcode}", "${body.ContactId}")`, (err) => {
      callback(err)
    })
  }

  static remove(id) {
    db.all(`DELETE FROM Addresses WHERE id = "${id}"`)
  }

  static update(id, body) {
    db.all(`UPDATE Addresses SET street = "${body.street}", city = "${body.city}", zipcode = "${body.zipcode}", ContactId = "${body.ContactId}" WHERE id = "${id}"`)
  }

  static createbycontact(id, body) {
    db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${body.street}', '${body.city}', '${body.zipcode}', '${id}')`)
  }
}

module.exports = Addresses
