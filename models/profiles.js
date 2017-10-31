const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class Profile {
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Profiles`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static findWithContacts() {
    return new Promise((resolve, reject) => {
      let query = `SELECT Profiles.*, Contacts.name FROM Profiles
      LEFT JOIN Contacts ON Profiles.contactId = Contacts.id`
      db.all(query, (err, rows) => {
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
      db.run(`INSERT INTO Profiles (username, password, contactId) VALUES (
        '${data.username}', '${data.password}', ${data.contactId})`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static findById(profileId) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Profiles WHERE id = ${profileId}`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static update(data, profileId) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Profiles SET username = '${data.username}', password = '${data.password}', contactId = ${data.contactId}
      WHERE id = ${profileId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static remove(profileId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Profiles WHERE id = ${profileId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = Profile;
