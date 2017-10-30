var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Group {
  static getAll(callback) {
    db.all('SELECT * FROM Groups', (err, rows)=>{
      callback(err, rows);
    })
  }

  static create(input, callback) {
    db.run(`INSERT INTO Groups (name_of_group) VALUES ('${input.name_of_group}')`, err => {
      callback(err)
    })
  }

  static getOne(id, callback) {
    db.get(`SELECT * FROM Groups WHERE id='${id}'`, (err, rows)=>{
      callback(err, rows);
    })
  }

  static update(input, id, callback) {
    db.run(`UPDATE Groups SET name_of_group='${input.name_of_group}' WHERE id='${id}'`, err => {
      callback(err)
    })
  }

  static destroy(id, callback) {
    db.run(`DELETE FROM Groups WHERE id='${id}'`, err => {
      callback(err)
    })
  }
}

module.exports = Group;
