var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class ContactGroup {
  static getAll(callback) {
    db.all('SELECT * FROM ContactsGroups', (err, rows)=>{
      callback(err, rows);
    })
  }

  static create(contact_id,group_id,callback) {
    db.run(`INSERT INTO ContactsGroups (contact_id,group_id) VALUES ('${contact_id}','${group_id}')`,err => {
      callback(err)
    })
  }

  static destroy(id) {
    db.run(`DELETE FROM ContactsGroups WHERE id='${id}'`)
  }
}

module.exports = ContactGroup;
