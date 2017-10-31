const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

class Profile{
    static findAll(cb){
      let query = `SELECT Profile.*, Contacts.name FROM Profile LEFT JOIN Contacts ON Contacts.id = Profile.contacts_id`;
      db.all(query,function(err,rowProfile){
        if(!err){
          cb(null,rowProfile)
        }else{
          console.log(err)
        }
      })
    }
    
    static create(obj,cb){
      let query = `INSERT INTO Profile (username,password)
                   VALUES("${obj.username}", "${obj.password}")`;
      db.all(query,function(err,rowProfile){
        if(!err){
          cb(null,rowProfile)
        }else{
          console.log(err)
        }
      })
    }
  
    static findById(id,cb) {
      let query = `SELECT * FROM Profile where id = "${id}`;
      db.all(query, function(err, rowProfile) {
        if(!err) {
          cb(null, rowProfile)
        } else {
          console.log(err)
        }
      })
    } 
  
    static Update(request, callback){
      db.all(`SELECT * FROM Profile where id = "${request.params}"`,function(err,rowProfile){
        if(err){
          callback(err,null)
        }
        else{
          callback(null, rowProfile)
        }
    })
  }
  static EditPost(Obj, callback){
  db.all(`UPDATE Profile SET 
          username = "${Obj.username}",
          password = "${Obj.password}" WHERE id = "${Obj.id}"`, function (err,rowProfile){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rowProfile)
      }
    })
  }
    
  
    static remove(id,cb){
      let query = `DELETE FROM Profile
                   WHERE id = ${id}`;
      db.all(query,function(err,rowProfile){
        if(!err){
          cb(null,rowProfile)
        }else{
          console.log(err)
        }
      })
    }
  }
  
  module.exports = Profile