const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')


class Groups{

  static findAll(cb){
    let query = `SELECT * FROM Groups`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      } else {
        console.log(err);
      }
    })
  }

  static findById(id,cb){
    let query = `SELECT * FROM Groups WHERE id = '${id}'`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }

  static update(obj,id){
    let query = `UPDATE Groups SET name_of_group = "${obj.groups}"
    WHERE id = '${id}'`;
    db.all(query)
  }

  static create(obj,cb){
    let query = `INSERT INTO Groups(name_of_group) VALUES(
    "${obj.groups}")`;
      db.all(query,function(err,rows) {
        if(!err){
          cb(null,rows)
        }else {
          console.log(err);
        }
      })
  }

  static remove(id,cb){
    let query = `DELETE FROM Groups WHERE id = ${id} `;
    db.all(query,function(err,rows) {
      if(!err){
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }
}
module.exports = Groups;
