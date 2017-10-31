const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class Contact {
  static findAll(callback) {
    db.all(`SELECT * FROM Contacts`, (err, rows) => {
      callback(err, rows)
    })
  }

  static create(data, callback) {
    db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES (
      '${data.name}', '${data.company}', '${data.telp_number}', '${data.email}')`, function(err) {
        // console.log(this.lastID);
      callback(err, this.lastID)
    })
  }

  static findById(contactId, callback) {
    db.get(`SELECT * FROM Contacts WHERE id = ${contactId}`, (err, rows) => {
      callback(err, rows)
    })
  }

  static update(data, contactId, callback) {
    db.run(`UPDATE Contacts SET name = '${data.name}', company = '${data.company}',
    telp_number = '${data.telp_number}', email = '${data.email}' WHERE id = ${contactId}`, (err) => {
      callback(err)
    })
  }

  static remove(contactId, callback) {
    db.run(`DELETE FROM Contacts WHERE id = ${contactId}`, (err) => {
      callback(err)
    })
  }
}

module.exports = Contact;
