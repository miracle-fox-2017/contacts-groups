const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class ContactGroup {
  static findAll(callback) {
    db.all(`SELECT * FROM contactsGroups`, (err, rows) => {
      callback(err, rows)
    })
  }

  static findWithGroups(callback) {
    let query = `SELECT ContactsGroups.*, Groups.name_of_group FROM ContactsGroups
    LEFT JOIN Groups ON ContactsGroups.groupId = Groups.id`
    db.all(query, (err, rows) => {
      callback(err, rows)
    })
  }

  static findWithContacts(callback) {
    let query = `SELECT ContactsGroups.*, Contacts.name FROM ContactsGroups
    LEFT JOIN Contacts ON ContactsGroups.contactId = Contacts.id`
    db.all(query, (err, rows) => {
      callback(err, rows)
    })
  }

  static create(contactId, groupId, callback) {
    // console.log(contactId + ' & ' + groupId);
    db.run(`INSERT INTO contactsGroups (contactId, groupId) VALUES
    (${contactId}, ${groupId})`, (err, rows) => {
      callback(err)
    })
  }
}

module.exports = ContactGroup;
