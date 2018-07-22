const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class ContactGroup {
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM contactsGroups`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static findWithGroups() {
    return new Promise((resolve, reject) => {
      let query = `SELECT ContactsGroups.*, Groups.name_of_group FROM ContactsGroups
      LEFT JOIN Groups ON ContactsGroups.groupId = Groups.id`
      db.all(query, (err, rows) => {
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
      let query = `SELECT ContactsGroups.*, Contacts.name FROM ContactsGroups
      LEFT JOIN Contacts ON ContactsGroups.contactId = Contacts.id`
      db.all(query, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static create(contactId, groupId) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO contactsGroups (contactId, groupId) VALUES
      (${contactId}, ${groupId})`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = ContactGroup;
