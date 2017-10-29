const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class Group {
  static findAll(callback) {
    db.all(`SELECT * FROM Groups`, (err, rows) => {
      callback(err, rows)
    })
  }

  static create(data, callback) {
    db.run(`INSERT INTO Groups (name_of_group) VALUES ('${data.name}')`, (err) => {
      callback(err)
    })
  }

  static findById(groupId, callback) {
    db.get(`SELECT * FROM Groups WHERE id = ${groupId}`, (err, rows) => {
      callback(err, rows)
    })
  }

  static update(data, groupId, callback) {
    db.run(`UPDATE Groups SET name_of_group = '${data.name}' WHERE id = ${groupId}`, (err) => {
      callback(err)
    })
  }

  static delete(groupId, callback) {
    db.run(`DELETE FROM Groups WHERE id = ${groupId}`, (err) => {
      callback(err)
    })
  }
}

module.exports = Group;
