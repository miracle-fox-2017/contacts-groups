var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/data.db');

class Profile {
  static findAll(callback) {
    db.all(`SELECT * FROM Profiles`, (err, rows) => {
      callback(err, rows)
    })
  }

  static findWithContacts(callback) {
    let query = `SELECT Profiles.*, Contacts.name FROM Profiles
    LEFT JOIN Contacts ON Profiles.contactId = Contacts.id`
    db.all(query, (err, rows) => {
      callback(err, rows)
    })
  }

  static create(data, callback) {
    db.run(`INSERT INTO Profiles (username, password, contactId) VALUES (
      '${data.username}', '${data.password}', ${data.contactId})`, (err) => {
      callback(err)
    })
  }

  static findById(profileId, callback) {
    db.get(`SELECT * FROM Profiles WHERE id = ${profileId}`, (err, rows) => {
      callback(err, rows)
    })
  }

  static update(data, profileId, callback) {
    db.run(`UPDATE Profiles SET username = '${data.username}', password = '${data.password}', contactId = ${data.contactId}
    WHERE id = ${profileId}`, (err) => {
      callback(err)
    })
  }

  static remove(profileId, callback) {
    db.run(`DELETE FROM Profiles WHERE id = ${profileId}`, (err) => {
      callback(err)
    })
  }
}

module.exports = Profile;
