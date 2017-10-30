var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Group {

  static findAll(callback) {
    db.all(`SELECT * FROM Groups`, (err, rows)=> {
      if (err) {
        console.log(err);
      }else {
        callback(rows);
      }
    });
  }
}

module.exports = Group;
