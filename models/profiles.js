const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Profile{
  static findAll(){
    let query = `SELECT Profile.*,Contacts.name FROM Profile LEFT JOIN
                  Contacts ON Contacts.id = Profile.contacts_id`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,dataProfile)=>{
        if(!err){
          resolve(dataProfile)
        }else{
          reject(err)
        }
      })
    })
  }

  static create(obj){
    let query = `INSERT INTO Profile (username,password,contacts_id)
                 VALUES("${obj.username}", "${obj.password}","${obj.contacts_id}")`;
     return new Promise((resolve,reject)=>{
     db.all(query,(err,dataProfile)=>{
       if(!err){
         resolve(dataProfile)
       }else{
         reject(err)
       }
      })
    })
  }

  static delete(id){
    let query = `DELETE FROM Profile
                 WHERE id = ${id}`;
    return new Promise((resolve,reject)=>{
    db.all(query,(err,dataProfile)=>{
      if(!err){
        resolve(dataProfile)
      }else{
        reject(err)
      }
     })
   })
  }

  static findById(id){
    let query = `SELECT * FROM Profile where id = "${id}"`;
    return new Promise((resolve,reject)=>{
    db.all(query,(err,dataProfile)=>{
      if(!err){
        resolve(dataProfile)
      }else{
        reject(err)
      }
     })
   })
  }

  static update(obj){
    let query = `UPDATE Profile
               SET username = "${obj.username}",
               password = "${obj.password}",
               contacts_id = "${obj.contacts_id}"
               WHERE id = "${obj.id}"`;
     return new Promise((resolve,reject)=>{
     db.all(query,(err,dataProfile)=>{
      if(!err){
        resolve(dataProfile)
      }else{
        reject(err)
      }
     })
   })
 }
}

module.exports = Profile
