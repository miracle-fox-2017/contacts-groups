const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class Address {
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Addresses`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static findWithContact() {
    return new Promise((resolve, reject) => {
      let query = `SELECT Addresses.*, Contacts.name FROM Addresses
      LEFT JOIN Contacts ON Addresses.contactId = Contacts.id`
      db.all(query, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO Addresses (street, city, zipcode, contactId) VALUES (
        '${data.street}', '${data.city}', '${data.zipcode}', ${data.contactId})`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static findById(addressId) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Addresses WHERE id = ${addressId}`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static update(data, addressId) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Addresses SET street = '${data.street}', city = '${data.city}', zipcode = '${data.zipcode}',
      contactId = ${data.contactId} WHERE id = ${addressId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static remove(addressId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Addresses WHERE id = ${addressId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = Address;
