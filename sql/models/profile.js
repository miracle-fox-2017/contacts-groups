const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');



class Profile {
  static leftJoin(callback) {
    let query = `SELECT Profile.username, Profile.id, Profile.password, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.id_contacts = Contacts.id`;
    db.all(query,function(err,rows){
      if(err){
        callback(err, null)
      }
      else{
        callback(null,rows)
      }
    })
  }
  static findWhere(Obj,callback){
    let query = `SELECT * FROM Profile WHERE id_contacts = "${Obj.id}"`;
    db.all(query, function(err,rows){
      if(err){
        callback (err, null)
      }
      else{
        callback(null, rows)
      }
    })
  }
  static findAllProfile(callback) {
    let query = `SELECT * FROM Profile`;
    db.all(query,function(err,rows){
      if(err){
        callback(err, null)
      }
      else{
        callback(null,rows)
      }
    })
  }

  static profileCreate(Obj, callback){

    let query = (`INSERT INTO Profile (username, password, id_contacts) VALUES('${Obj.username}', '${Obj.password}',${Obj.id_contact})`);
    db.run(query, function(err){
      if(err){
        callback(err)
      }
      else{
        callback(null)
      }
    })
  }

  static profileUpdate(Obj, callback){
    let query = (`SELECT * FROM Profile where id = "${Obj.id}"`)
    db.all(query, function(err,rows){
      if(err){
        callback(err, null)
      }
      else{
        callback(null,rows)
      }
    })
  }
  static profileUpdatePost(Obj, callback){
    let query = (`UPDATE Profile
               SET username = "${Obj.username}",
                   password = "${Obj.password}"
                   WHERE id = "${Obj.id}"`);
    db.all(query, function(err,rows){
       if(err){
         callback(err, null)
      }
       else{
         callback(null,rows)
       }
     })
  }


  static remove(Obj, callback){
    let query = (`DELETE FROM Profile WHERE id = "${Obj.id}"`)
    db.all(query, function(err,rows){
       if(err){
         callback(err, null)
      }
       else{
         callback(null,rows)
       }
     })
   }
 }


module.exports = Profile;
