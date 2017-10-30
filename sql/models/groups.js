const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


class Groups {
  static findAllGroups(callback) {
    let query = `SELECT * FROM Groups`
    db.all(query,function(err,rows){
      if(err){
        callback(err, null)
      }
      else{
        callback(null,rows)
      }
    })
  }
  static groupsCreate(Obj, callback){
  db.all(`INSERT INTO Groups (name_of_group)
          VALUES('${Obj.name}')`, function(err,rows){
        if(err){
          callback(err,null)
        }
        else{
          callback(null,rows)
      }
    })
  }

  static groupUpdate(Obj, callback){
    let query = (`SELECT * FROM Groups where id = "${Obj.id}"`)
    db.all(query, function(err, rows){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rows)
      }
    })
  }
  static groupUpdatePost(Obj, callback){
    let query = (`UPDATE Groups
           SET name_of_group = "${Obj.name}"
           WHERE id = "${Obj.id}"`);
  db.all(query, function(err,rows){
    if(err){
      callback(err,null)
    }
    else{
      callback(null, rows)
    }
  })
 }
 static remove(Obj, callback){
   let query = (`DELETE FROM Groups
              WHERE id = "${Obj.id}"`)
  db.all(query, function(err,rows){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rows)
      }
    })
  }
}
module.exports = Groups;
