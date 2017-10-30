const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/data.db');

class ContactGroup {
  static findAll(callback) {
    db.all(`SELECT * FROM contactsGroups`, (err, rows) => {
      callback(err, rows)
    })
  }

  static create(data, callback) {
    db.run(`INSERT INTO contactsGroups (contactId, groupId) VALUES
    (${data.contactId}, ${data.groupId})`, (err, rows) => {
      callback(err)
    })
  }

  static delete(contactGroupsId, callback) {
    db.run(`DELETE FROM contactsGroups WHERE id = ${contactGroupsId}`, (err) => {
      callback(err)
    })
  }
}

module.exports = ContactGroup;
