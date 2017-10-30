const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

class Groups{
  static findAll(cb){
    let query = `SELECT * FROM Groups`;
    db.all(query,function(err,GroupsRows){
      if(!err){
        cb(null,GroupsRows)
      }else{
        console.log(err)
      }
    })
  }

  static create(obj,cb){
    let query = `INSERT INTO Groups (name_of_group)
                 VALUES("${obj.name_of_group}")`;
    db.all(query,function(err,GroupsRows){
      if(!err){
        cb(null,GroupsRows)
      }else{
        console.log(err)
      }
    })
  }

  static delete(id){
    let query = `DELETE FROM Groups
                 WHERE id = ${id}`;
    db.all(query)
  }

  static findById(id,cb){
    let query = `SELECT * FROM Groups where id = "${id}"`;
    db.all(query,function(err,GroupsRows){
      if(!err){
        cb(null,GroupsRows)
      }else{
        console.log(err)
      }
    })
  }

  static update(obj){
    let query = `UPDATE Groups
               SET name_of_group = "${obj.name_of_group}",
               WHERE id = "${obj.id}"`;
   db.all(query)
  }
}

module.exports = Groups
