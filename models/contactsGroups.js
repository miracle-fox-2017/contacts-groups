var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class ContactsGroups {
  static getAll(callback) {
    db.all('SELECT * FROM ContactsGroups', (err, rows)=>{
      callback(rows);
    })
  }

  static create(contact_id,group_id,callback) {
    db.run(`INSERT INTO ContactsGroups (contact_id,group_id) VALUES ('${contact_id}','${group_id}')`,err => {
      if(!err){
        callback(true)
      }
    })
  }

  static destroy(id) {
    db.run(`DELETE FROM ContactsGroups WHERE id='${id}'`)
  }
}

module.exports = ContactsGroups;
