const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./addresses')

class Group {

  static findAll(callback) {
    db.all(`SELECT * FROM Groups`, (err, groups) => {
      callback(err, groups)
    })
  }

  static findByid(id, callback) {
    db.all(`SELECT * FROM Groups WHERE id="${id}"`, (err, group) => {
      callback(err, group)
    })
  }

  static create(body) {
    db.all(`INSERT INTO Groups (name_of_group) VALUES ("${body.name_of_group}")`)
  }

  static remove(id) {
    db.all(`DELETE FROM Groups WHERE id = "${id}"`)
  }

  static update(id, body) {
    db.all(`UPDATE Groups SET name_of_group = "${body.name_of_group}" WHERE id = "${id}"`)
  }

}

module.exports = Group
