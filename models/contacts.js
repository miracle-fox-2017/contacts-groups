var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Contact {
  static getAll(callback) {
    db.all('SELECT * FROM Contacts', (err, rows)=>{
      callback(err, rows);
    })
  }

  static create(input,callback) {
    if(!input.name){
      callback('Please fill out all required fields!!', null)
    }else{
      db.run(`INSERT INTO Contacts (name,company,telp_number,email) VALUES ('${input.name}','${input.company}','${input.telp_number}','${input.email}')`,function (err){
        callback(err, this.lastID)
      })
    }
  }

  static getOne(id, callback) {
    db.get(`SELECT * FROM Contacts WHERE id='${id}'`, (err, rows)=>{
      callback(err, rows);
    })
  }

  static update(input, id, callback) {
    db.run(`UPDATE Contacts SET name='${input.name}', company='${input.company}', telp_number='${input.telp_number}', email='${input.email}' WHERE id='${id}'`, err => {
      callback(err)
    })
  }

  static destroy(id, callback) {
    db.run(`DELETE FROM Contacts WHERE id='${id}'`, err => {
      callback(err)
    })
  }
}

module.exports = Contact;
