const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class Group {
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO Groups (name_of_group) VALUES ('${data.name}')`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static findById(groupId) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Groups WHERE id = ${groupId}`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static update(data, groupId) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Groups SET name_of_group = '${data.name}' WHERE id = ${groupId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static remove(groupId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Groups WHERE id = ${groupId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = Group;
