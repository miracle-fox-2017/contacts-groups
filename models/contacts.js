const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Profile = require('./profiles')

class Contact {
  static findAll(callback) {
    db.all(`SELECT * FROM Contacts`, (err, contact) => {
      callback(err, contact)
    })
  }

  static findById(id, callback) {
    db.all(`SELECT * FROM Contacts WHERE id = "${id}"`, (err, contact) => {
      callback(err, contact)
    })
  }

  static create(body, callback) {
    db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${body.name}', '${body.company}', '${body.telp_number}', '${body.email}')`, function(err) {
      callback(err, this.lastID)
    })
  }

  static remove(id) {
    db.all(`DELETE FROM Contacts WHERE id = "${id}"`)
  }

  static update(id, body) {
    db.all(`UPDATE Contacts SET name = '${body.name}', company = '${body.company}', telp_number = '${body.telp_number}', email = "${body.email}" WHERE id = ${id}`)
  }
}

module.exports = Contact;
