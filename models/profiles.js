const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')


class Profile{

  static findAll(cb){
    let query = `SELECT * FROM Profile`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      } else {
        console.log(err);
      }
    })
  }

  static findById(id,cb){
    let query = `SELECT * FROM Profile WHERE id = '${id}'`;
    db.all(query,function(err,rows) {
      if (!err) {
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }

  static update(obj,id){
    let query = `UPDATE Profile SET username = '${obj.username}',password = '${obj.password}'
    WHERE id = '${id}'`;
    db.all(query)
  }


  static create(obj,cb){
    let query = `INSERT INTO Profile(username,password) VALUES(
      '${obj.username}',
      '${obj.password}')`;
      db.all(query,function(err,rows) {
        if(!err){
          cb(null,rows)
        }else {
          console.log(err);
        }
      })
  }

  static remove(id,cb){
    let query = `DELETE FROM Profile WHERE id = ${id} `;
    db.all(query,function(err,rows) {
      if(!err){
        cb(null,rows)
      }else {
        console.log(err);
      }
    })
  }
}
module.exports = Profile;
