const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')


class Contacts{
  static findAll(cb){
    let query = `SELECT * FROM Contacts`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }

  static findById(id,cb){
    let query = `SELECT * FROM Contacts WHERE id = '${id}'`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(rows);
      }
    })
  }


  static update(obj,id){
    let query = `UPDATE Contacts SET name = '${obj.name}',company = '${obj.company}',telp_number = '${obj.telp_number}',
    email = '${obj.email}'
    WHERE id = '${id}'`;
    db.all(query)
  }

  static create(obj,cb){
    let query = `INSERT INTO Contacts(name,company,telp_number,email) VALUES(
      '${obj.name}','${obj.company}','${obj.telp_number}','${obj.email}')`;
      db.all(query,function(err,rows) {
        if(!err){
          cb(null,rows)
        }
        else {
          console.log(err);
        }
      })
  }

  static remove(id,cb){
    let query = `DELETE FROM Contacts WHERE id = ${id}`;
    db.all(query,function(err,rows) {
      if(!err){
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }
}
module.exports = Contacts;
