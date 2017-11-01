const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')


class Addresses{
  static findAll(cb){
    let query = `SELECT * FROM Addresses`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }

  static findById(id,cb){
    let query = `SELECT * FROM Addresses WHERE id = '${id}'`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }

  static update(obj,id){
    let query = `UPDATE Addresses SET street = '${obj.street}',city = '${obj.city}',zipcode = '${obj.zipcode}'
    WHERE id = '${id}'`;
    db.all(query)
  }

  static create(obj,cb){
  let query = `INSERT INTO Addresses(street,city,zipcode) VALUES(
    '${obj.street}','${obj.city}','${obj.zipcode}')`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }

  static remove(id,cb){
    let query = `DELETE FROM Addresses WHERE id = ${id}`;
    db.all(query,function(err,rows) {
      if(!err){
        cb(rows)
      }else {
        console.log(err);
      }
    })
  }
}
module.exports = Addresses;
