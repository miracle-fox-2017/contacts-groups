var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Contact {

  // static findAll(callback) {
  //   db.all('SELECT * FROM Contacts', (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }else {
  //       callback(rows);
  //     }
  //   });
  // }
  //PROMISE
  static findAll(callback) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM Contacts', (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  // static findById(req, callback) {
  //   db.each(`SELECT * FROM Contacts WHERE ID = ${req.params.id}`, (err, rows)=> {
  //     if (err) {
  //       console.log(err);
  //     }else {
  //       callback(rows);
  //     }
  //   });
  // }

  static delete(data) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE from Contacts WHERE id = "${data}"`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static create(body) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT into Contacts (name, company, telp_number, email) VALUES ("${body.name}", "${body.company}", "${body.telp_number}", "${body.email}")`, function (err) {
        if (!err) {
          // console.log(this.lastID);
          resolve(this.lastID);
        } else { reject(err); }
      });
    });
  }

  static editById(params) {
    return new Promise((resolve, reject) => {
      db.each(`SELECT * FROM Contacts WHERE id = ${params}`, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else { reject(err); }
      });
    });
  }

  static update(body, params) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Contacts SET name = '${body.name}', company = '${body.company}', telp_number = '${body.telp_number}', email = '${body.email}' WHERE id = '${params.id}'`, (err) => {
        if (!err) {
          resolve(err);
        } else { reject(err); }
      });
    });
  }
}

module.exports = Contact;
