const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');

class Groups{
  static findAll(){
    let query = `SELECT * FROM Groups`;
    return new Promise((resolve,reject)=>{
      db.all(query,function(err,dataGroup){
        if(err){
          reject(err)
        }else{
          resolve(dataGroup)
        }
      })
    })
  }

  static create(obj){
    let query = `INSERT INTO Groups (name_of_group)
                 VALUES("${obj.name_of_group}")`;
    return new Promise((resolve,reject)=>{
      db.all(query,function(err,dataGroup){
        if(err){
          reject(err)
        }else{
          resolve(dataGroup)
        }
      })
    })
  }

  static remove(id){
    let query = `DELETE FROM Groups
                 WHERE id = ${id}`;
    return new Promise((resolve,reject)=>{
      db.all(query,function(err,dataGroup){
        if(err){
          reject(err)
        }else{
          resolve(dataGroup)
        }
      })
    })
  }

  static findById(id){
    let query = `SELECT * FROM Groups where id = "${id}"`;
    return new Promise((resolve,reject)=>{
      db.all(query,function(err,dataGroup){
        if(err){
          reject(err)
        }else{
          resolve(dataGroup)
        }
      })
    })
  }

  static update(obj){
    let query = `UPDATE Groups
               SET name_of_group = "${obj.name_of_group}"
               WHERE id = "${obj.id}"`;
   return new Promise((resolve,reject)=>{
     db.all(query,function(err,dataGroup){
       if(err){
         reject(err)
       }else{
         resolve(dataGroup)
       }
     })
   })
  }
}

module.exports = Groups
