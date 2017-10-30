var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class ContactsGroups {

  static findAll(callback) {
    db.all(`SELECT ContactsGroups.ContactId, ContactsGroups.GroupId, Groups.name_of_group FROM ContactsGroups LEFT JOIN Groups ON Groups.id = ContactsGroups.GroupId`, (err, rows)=> {
      if (err) {
        console.log(err);
      }else {
        callback(rows);
      }
    });
  }

  static findName(callback) {
    db.all(`SELECT ContactsGroups.ContactId, ContactsGroups.GroupId, Contacts.name FROM ContactsGroups LEFT JOIN Contacts ON Contacts.id = ContactsGroups.ContactId`, (err, rows)=> {
      if (err) {
        console.log(err);
      }else {
        callback(rows);
      }
    });
  }
}

module.exports = ContactsGroups;
