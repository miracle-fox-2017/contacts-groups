var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Addresses {
  static getAll(callback) {
    db.all('SELECT Addresses.*, Contacts.Name FROM Addresses LEFT JOIN Contacts ON contact_id=Contacts.id', (err, rows)=>{
      callback(rows);
    })
  }

  static create(input) {
    db.run(`INSERT INTO Addresses (street, city, zipcode) VALUES ('${input.street}', '${input.city}', '${input.zipcode}')`)
  }

  static getOne(id, callback) {
    db.get(`SELECT * FROM Addresses WHERE id='${id}'`, (err, rows)=>{
      callback(rows);
    })
  }

  static update(input, id) {
    db.run(`UPDATE Addresses SET street='${input.street}', city='${input.city}', zipcode='${input.zipcode}', contact_id='${input.contact_id}' WHERE id='${id}'`)
  }

  static destroy(id) {
    db.run(`DELETE FROM Addresses WHERE id='${id}'`)
  }
}

module.exports = Addresses;
