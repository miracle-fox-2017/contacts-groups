const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class Profile {
  constructor(){}
  
  static showProfile(cb){
    let q = `SELECT * FROM Profile`;
    db.all(q, function(err, rows){
      cb(rows);
    })
  }
  
  static insertProfile(dataInsert, cb){
    let queryInsert = `INSERT OR IGNORE INTO Profile
                       (username, password, id_contacts)
                       VALUES
                       ("${dataInsert.username}", "${dataInsert.password}",
                       "${dataInsert.id_contacts}");`    
    // console.log(query);
    db.run(queryInsert, function(err){
      cb(this);
    });
    
  }
  
  static updateProfile(dataUpdate, cb){
    let queryUpdate = `UPDATE Profile SET
                     id = ${dataUpdate.id},
                     username = "${dataUpdate.username}",
                     password = "${dataUpdate.password}",
                     id_contacts = "${dataUpdate.id_contacts}"
                   WHERE 
                     id = ${dataUpdate.id}`;
    db.run(queryUpdate, function(err){
      cb(err);
    })
  }
  
  static deleteProfile(id, cb){
    let queryDelete = `DELETE FROM Profile WHERE id = ${id}`;   
    //execute query
    db.run(queryDelete,(err)=>{
      cb(err);
    })
  }
  
  static showSpecificId(id, cb){
    let showSpecificId = `SELECT Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password, Contacts.id AS cid, Contacts.name FROM Profile 
                            JOIN Contacts 
                            ON Profile.id_contacts = Contacts.id
                            WHERE Profile.id=${id}`;
    //execute query
    db.all(showSpecificId, (err, profile)=>{
      cb(profile);
    })
  }
  
  static showProfilesJoin(cb){
    let showProfilesJoin = `SELECT
                             Profile.id AS id, Profile.id_contacts, Profile.username, Profile.password,
                             Contacts.id AS cid, Contacts.name
                            FROM Profile 
                            JOIN Contacts 
                            ON Profile.id_contacts = Contacts.id`;
    db.all(showProfilesJoin, (err, rows)=>{
      cb(rows);
    })
  }

  static checkId(id, cb){
    let qCheckId = `SELECT COUNT (*) FROM Profile WHERE id_contacts = ${id}`
    db.all(qCheckId, (err, rows)=>{
      cb(rows[0]['COUNT (*)']);
    })
  }

}

module.exports = Profile;