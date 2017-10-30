const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./contacts')

class Profile {

  static findAll(callback) {
    db.all(`SELECT * FROM Profile`, (err, profile) => {
      callback(profile)
    })
  }

  static findAllwithContact(callback) {
    db.all(`SELECT Profile.id, Profile.username, Profile.password, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contactId = Contacts.id ORDER BY Profile.contactId`, (err, profile) => {
      callback(err, profile)
    })
  }

  static findAllwithContactById(id, callback) {
    db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.contactId, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contactId = Contacts.id WHERE Profile.id = "${id}"`, (err, profiles) => {
      callback(err, profiles)
    })
  }

  static findByid(id, callback) {
    db.all(`SELECT * FROM Profile WHERE id = "${id}"`, (err, profile) => {
      callback(profile)
    })
  }

  static create(body, callback) {
    db.all(`INSERT INTO Profile (username, password, contactId) VALUES ("${body.username}", "${body.password}", "${body.contactId}")`, (err) => {
      callback(err)
    })
  }

  static remove(id) {
    db.all(`DELETE FROM Profile WHERE id = "${id}"`)
  }

  static update(id, body) {
    db.all(`UPDATE Profile SET username = "${body.username}", password = "${body.password}", contactId = "${body.contactId}" WHERE id = "${id}"`)
  }
}

module.exports = Profile
