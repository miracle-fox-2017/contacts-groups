const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./addresses')

class Group {

  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups`, (err, groups) => {
        if(!err) {
          resolve(groups)
        }
        else {
          reject(err)
        }
      })
    })
  }


  static findByid(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups WHERE id = "${id}"`, (err, group) => {
        if(!err) {
          resolve(group)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static create(body) {
    return new Promise((resolve, reject) => {
      db.all(`INSERT INTO Groups (name_of_group) VALUES ("${body.name_of_group}")`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      db.all(`DELETE FROM Groups WHERE id = ${id}`, (err) => {
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
      db.all(`UPDATE Groups SET name_of_group = "${body.name_of_group}" WHERE id = "${id}"`, (err) => {
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

module.exports = Group
