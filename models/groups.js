var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Groups {
  static getAll(callback) {
    db.all('SELECT * FROM Groups', (err, rows)=>{
      callback(rows);
    })
  }

  static create(input) {
    db.run(`INSERT INTO Groups (name_of_group) VALUES ('${input.name_of_group}')`)
  }

  static getOne(id, callback) {
    db.get(`SELECT * FROM Groups WHERE id='${id}'`, (err, rows)=>{
      callback(rows);
    })
  }

  static update(input, id) {
    db.run(`UPDATE Groups SET name_of_group='${input.name_of_group}' WHERE id='${id}'`)
  }

  static destroy(id) {
    db.run(`DELETE FROM Groups WHERE id='${id}'`)
  }
}

module.exports = Groups;
