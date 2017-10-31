const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./contacts')

class Profile {

  static findAll() {
    // db.all(`SELECT * FROM Profile`, (err, profile) => {
    //   callback(profile)
    // })
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Profile`, (err, profile) => {
        if(!err) {
          resolve(profile)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static findAllwithContact() {
    return new Promise((resolve, reject) => {
      this.findAll().then((profile) => {
        let hasil = []
        profile.forEach((elemen, index) => {
          Contact.findById(elemen.contactId).then((contact) => {
            elemen.name = contact[0].name
            console.log(profile)

            hasil.push(elemen)

            if(index == profile.length - 1) {
              resolve(hasil)
            }
          })
        })
      })
    })
  }

  static findAllwithContactById(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.contactId, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contactId = Contacts.id WHERE Profile.id = "${id}"`, (err, profile) => {
        if(!err) {
          resolve(profile)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static findByid(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Profile WHERE id = "${id}"`, (err, profile) => {
        if(!err) {
          resolve(profile)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static create(body) {
    // db.all(`INSERT INTO Profile (username, password, contactId) VALUES ("${body.username}", "${body.password}", "${body.contactId}")`, (err) => {
    //   callback(err)
    // })
    return new Promise((resolve, reject) => {
      db.all(`INSERT INTO Profile (username, password, contactID) VALUES ("${body.username}", "${body.password}", "${body.contactId}")`, (err) => {
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
      db.all(`DELETE FROM Profile WHERE id = "${id}"`, (err) => {
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
      db.all(`UPDATE Profile SET username = "${body.username}", password = "${body.password}", contactId = "${body.contactId}" WHERE id = ${id}`, (err) => {
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

module.exports = Profile
