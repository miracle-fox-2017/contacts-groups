const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class Address {
  static findAll(callback) {
    db.all(`SELECT * FROM Addresses`, (err, rows) => {
      callback(err, rows)
    })
  }

  static create(data, callback) {
    db.run(`INSERT INTO Addresses (street, city, zipcode) VALUES (
      '${data.street}', '${data.city}', '${data.zipcode}')`, (err) => {
      callback(err)
    })
  }

  static findById(addressId, callback) {
    db.get(`SELECT * FROM Addresses WHERE id = ${addressId}`, (err, rows) => {
      callback(err, rows)
    })
  }

  static update(data, addressId, callback) {
    db.run(`UPDATE Addresses SET street = '${data.street}', city = '${data.city}', zipcode = '${data.zipcode}'
    WHERE id = ${addressId}`, (err) => {
      callback(err)
    })
  }

  static delete(addressId, callback) {
    db.run(`DELETE FROM Addresses WHERE id = ${addressId}`, (err) => {
      callback(err)
    })
  }
}

module.exports = Address;
