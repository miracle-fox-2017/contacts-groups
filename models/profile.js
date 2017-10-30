var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Profile {

  static findAll(callback) {
    db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.ContactId, Contacts.name, Contacts.id as ContactId FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.ContactId`, (err, rows) => {
      if (err) {
        console.log(err);
      }else {
        callback(rows);
      }
    });
  }
}

module.exports = Profile;
