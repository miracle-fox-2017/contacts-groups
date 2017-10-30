var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Address {
  static getAll(callback) {
    db.all('SELECT Addresses.*, Contacts.Name FROM Addresses LEFT JOIN Contacts ON contact_id=Contacts.id', (err, rows)=>{
      callback(err, rows);
    })
  }

  static create(input, callback) {
    db.run(`INSERT INTO Addresses (street, city, zipcode) VALUES ('${input.street}', '${input.city}', '${input.zipcode}')`, err => {
      callback(err)
    })
  }

  static getOne(id, callback) {
    db.get(`SELECT * FROM Addresses WHERE id='${id}'`, (err, rows)=>{
      callback(err, rows);
    })
  }

  static update(input, id, callback) {
    db.run(`UPDATE Addresses SET street='${input.street}', city='${input.city}', zipcode='${input.zipcode}', contact_id='${input.contact_id}' WHERE id='${id}'`, err => {
      callback(err)
    })
  }

  static destroy(id, callback) {
    db.run(`DELETE FROM Addresses WHERE id='${id}'`, err => {
      callback(err)
    })
  }
}

module.exports = Address;
