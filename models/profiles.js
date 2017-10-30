const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Profile{
  static findAll(cb){
    let query = `SELECT * FROM Profile`;
    db.all(query,function(err,profilesRows){
      if(!err){
        cb(null,profilesRows)
      }else{
        console.log(err)
      }
    })
  }

  static create(obj,cb){
    let query = `INSERT INTO Profile (username,password)
                 VALUES("${obj.username}", "${obj.password}")`;
    db.all(query,function(err,profilesRows){
      if(!err){
        cb(null,profilesRows)
      }else{
        console.log(err)
      }
    })
  }

  static delete(id){
    let query = `DELETE FROM Profile
                 WHERE id = ${id}`;
    db.all(query)
  }

  static findById(id,cb){
    let query = `SELECT * FROM Profile where id = "${id}"`;
    db.all(query,function(err,profilesRows){
      if(!err){
        cb(null,profilesRows)
      }else{
        console.log(err)
      }
    })
  }

  static update(obj){
    let query = `UPDATE Profile
               SET username = "${obj.username}",
               password = "${obj.password}"
               WHERE id = "${obj.id}"`;
   db.all(query)
  }
}

module.exports = Profile
