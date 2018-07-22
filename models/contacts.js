const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')


class Contact {
  static findAll() {

    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Contacts`, (err, contact) => {
        if(!err) {
          resolve(contact)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Contacts WHERE id = "${id}"`, (err, contact) => {
        if(!err) {
          resolve(contact)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static create(body) {
    // return new Promise((resolve, reject) => {
    //   db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${body.name}', '${body.company}', '${body.telp_number}', '${body.email}')`, function(err) {
    //     if(!err) {
    //       resolve(this.lastID)
    //     }
    //     else {
    //       reject(err)
    //     }
    //   })
    // })
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${body.name}', '${body.company}', '${body.telp_number}', '${body.email}')`, function(err) {
        if(!err) {
          resolve(this.lastID)
        }
        else {
          reject(err)
        }
      })
    })
  }


  static remove(id) {
    return new Promise((resolve, reject) => {
      db.all(`DELETE FROM Contacts WHERE id = '${id}'`, (err) => {
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
      db.all(`UPDATE Contacts SET name = "${body.name}", company = "${body.company}", telp_number = "${body.telp_number}", email ="${body.email}" WHERE id = "${id}"`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }
}

module.exports = Contact;
