const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./contacts')

class Addresses {
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Addresses`, (err, addresses) => {
        if(!err) {
          resolve(addresses)
        }
        else{
          reject(err)
        }
      })
    })
  }

  static findByid(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Addresses WHERE id = "${id}"`, (err, addresses) => {
        if(!err) {
          resolve(addresses)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static findAllwithContact() {
    // db.all(`SELECT Addresses.id, Addresses.street, Addresses.zipcode, Addresses.ContactId, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id ORDER BY Addresses.ContactId`, (err, addresses) => {
    //   callback(err, addresses)
    // })
    return new Promise((resolve, reject) => {
      this.findAll().then((addresses) => {
        var hasil = []

        addresses.forEach((elemen, index) => {
          Contact.findById(elemen.ContactId).then((contact) => {
            elemen.name = contact[0].name
            hasil.push(elemen)
            if(index == addresses.length - 1) {
              resolve(hasil)
            }
          })
        })
      })
    })
  }

  static findAllwithContactById(id) {
    return new Promise((resolve, reject) => {
      this.findByid(id).then((addresses) => {
        Contact.findById(addresses[0].ContactId).then((contact) => {
          addresses[0].name = contact[0].name
          resolve(addresses)
        })
      })
    })
  }

  static findWhere(name, value) {
    // db.all(`SELECT * FROM Addresses WHERE ${name} = '${value}'`, (err, addresses) => {
    //   callback(err, addresses)
    // })
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Addresses WHERE ${name} = '${value}'`, (err, addresses) => {
        if(!err) {
          resolve(addresses)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static create(body) {
    return new Promise((resolve, reject) => {
      db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ("${body.street}", "${body.city}", "${body.zipcode}", "${body.ContactId}")`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
    // db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ("${body.street}", "${body.city}", "${body.zipcode}", "${body.ContactId}")`)
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      db.all(`DELETE FROM Addresses WHERE id = "${id}"`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static update(id, body) {
    return new Promise((resolve, reject) => {
      db.all(`UPDATE Addresses SET street = "${body.street}", city = "${body.city}", zipcode = "${body.zipcode}", ContactId = "${body.ContactId}" WHERE id = "${id}"`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
    // db.all(`UPDATE Addresses SET street = "${body.street}", city = "${body.city}", zipcode = "${body.zipcode}", ContactId = "${body.ContactId}" WHERE id = "${id}"`)
  }

  static createbycontact(id, body) {
    return new Promise((resolve, reject) => {
      db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${body.street}', '${body.city}', '${body.zipcode}', ${id})`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
    // db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${body.street}', '${body.city}', '${body.zipcode}', '${id}')`)
  }
}

module.exports = Addresses
