const sqlite3     = require("sqlite3").verbose();
const db          = new sqlite3.Database("./database/database.db");

class Awc {
  static findAll(callback){
    let query = `SELECT a.*, c.name as contacts
                FROM address AS a,
                contacts as c
                WHERE a.id_contacts = c.id`;

    let queryContact = `SELECT * FROM contacts`

    db.all(query, function(err, rows) {
      if (!err) {
        db.all(queryContact, function(err, data) {
          if (!err) {
            callback(null, rows, data)
          }
        })
      }else {
        callback(err, null, null)
      }
    })
  }
}

module.exports = Awc;
