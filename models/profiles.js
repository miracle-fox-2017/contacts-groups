var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Profile {
  static getAll() {
    return new Promise(function(resolve, reject) {
      db.all('SELECT Profiles.*, Contacts.name FROM Profiles LEFT JOIN Contacts ON contact_id=Contacts.id', (err, rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    });
  }

  static create(input) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO Profiles (username, password, contact_id) VALUES ('${input.username}', '${input.password}', '${input.contact_id}')`,err => {
        if(!err){
          resolve()
        }else(
          reject('Your contact already have profile')
        )
      })
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT * FROM Profiles WHERE id='${id}'`, (err, rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    });
  }

  static update(input, id) {
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE Profiles SET username='${input.username}', password='${input.password}', contact_id='${input.contact_id}' WHERE id='${id}'`,err => {
        if(!err){
          resolve()
        }else{
          reject('Your contact already have profile')
        }
      })
    });
  }

  static destroy(id) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM Profiles WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else {
          reject(err)
        }
      })
    });
  }
}

module.exports = Profile;
