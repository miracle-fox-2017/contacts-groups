var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Profiles {
  static getAll(callback) {
    db.all('SELECT Profiles.*, Contacts.Name FROM Profiles LEFT JOIN Contacts ON contact_id=Contacts.id', (err, rows)=>{
      callback(rows);
    })
  }

  static create(input,callback) {
    db.run(`INSERT INTO Profiles (username, password, contact_id) VALUES ('${input.username}', '${input.password}', '${input.contact_id}')`,err => {
      if(err){
        callback('Your contact already have profile')
      }
    })
  }

  static getOne(id, callback) {
    db.get(`SELECT * FROM Profiles WHERE id='${id}'`, (err, rows)=>{
      callback(rows);
    })
  }

  static update(input, id, callback) {
    db.run(`UPDATE Profiles SET username='${input.username}', password='${input.password}', contact_id='${input.contact_id}' WHERE id='${id}'`,err => {
      if(err){
        callback('Your contact already have profile')
      }
    })
  }

  static destroy(id) {
    db.run(`DELETE FROM Profiles WHERE id='${id}'`)
  }
}

module.exports = Profiles;
