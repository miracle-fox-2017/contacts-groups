var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

class Address {
  static getAll() {
    return new Promise(function(resolve, reject) {
      db.all('SELECT Addresses.*, Contacts.Name FROM Addresses LEFT JOIN Contacts ON contact_id=Contacts.id', (err, rows)=>{
        if(!err){
          resolve(rows)
        }else{
          reject(err);
        }
      })
    });
  }

  static create(input) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO Addresses (street, city, zipcode, contact_id) VALUES ('${input.street}', '${input.city}', '${input.zipcode}', '${input.contact_id}')`, err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT * FROM Addresses WHERE id='${id}'`, (err, rows)=>{
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
      db.run(`UPDATE Addresses SET street='${input.street}', city='${input.city}', zipcode='${input.zipcode}', contact_id='${input.contact_id}' WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }

  static destroy(id) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM Addresses WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }
}

module.exports = Address;
