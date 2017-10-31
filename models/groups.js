const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

class Groups{
  static findAll(cb){
    let query = `SELECT * FROM Groups`;
    db.all(query,function(err,rowGroups){
      if(!err){
        cb(null,rowGroups)
      }else{
        console.log(err)
      }
    })
  }
  
  static create(obj,cb){
    let query = `INSERT INTO Groups (name_of_group)
                 VALUES("${obj.name_of_group}")`;
    db.all(query,function(err,rowGroups){
      if(!err){
        cb(null,rowGroups)
      }else{
        console.log(err)
      }
    })
  }

  static findById(id,cb) {
    let query = `SELECT * FROM Groups where id = "${id}`;
    db.all(query, function(err, rowGroups) {
      if(!err) {
        cb(null, rowGroups)
      } else {
        console.log(err)
      }
    })
  } 

  static Update(request, callback){
    db.all(`SELECT * FROM Groups where id = "${request.params}"`,function(err,rowGroups){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rowGroups)
      }
  })
}
static EditPost(Obj, callback){
db.all(`UPDATE Groups SET name_of_group = "${Obj.name_of_group}" WHERE id = "${Obj.id}"`, function (err,rowGroups){
    if(err){
      callback(err,null)
    }
    else{
      callback(null, rowGroups)
    }
  })
}

  

  static remove(id,cb){
    let query = `DELETE FROM Groups
                 WHERE id = ${id}`;
    db.all(query,function(err,rowGroups){
      if(!err){
        cb(null,rowGroups)
      }else{
        console.log(err)
      }
    })
  }
}

module.exports = Groups
