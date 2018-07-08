const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class Group {
  constructor(){}
  
  static showGroups(){
    return new Promise((resolve, reject)=>{
      let q = `SELECT * FROM Groups`;
      db.all(q, function(err, showGroups){
        // console.log('heloo');
        // callback here
        if(err){
          reject(err)
        } else {
          resolve(showGroups)
        }
      })
    })
    // let q = `SELECT * FROM Groups`;
    // db.all(q, function(err, showGroups){
    //   if(!err){
    //     cb(showGroups)
    //   } else {
    //     console.log(err);
    //   }
    // })
  }
  
  static showSpecificId(id, cb){
    return new Promise((resolve,reject)=>{
      let showSpecificId = `SELECT * FROM Groups WHERE id=${id}`;
      //execute query
      db.all(showSpecificId, (err, groups)=>{
        if(err){
          reject(err);
        } else {
          resolve(groups);
        }
      })
    })
    // let showSpecificId = `SELECT * FROM Groups WHERE id=${id}`;
    // //execute query
    // db.all(showSpecificId, (err, groups)=>{
    //   if(!err){
    //     cb(groups);
    //   } else {
    //     console.log(err);
    //   }
    // })
  }
  
  static insertGroups(dataInsert, cb){
    return new Promise((resolve,reject)=>{
      let queryInsert = `INSERT INTO Groups
                    (name_of_group)
                    VALUES
                    ("${dataInsert.name_of_group}");`    
      // console.log(query);
      db.run(queryInsert, function(err){
        if(err){
          reject(err);
        } else {
          resolve(this);
        }
      })
    })
    
    // let queryInsert = `INSERT INTO Groups
    //               (name_of_group)
    //               VALUES
    //               ("${dataInsert.name_of_group}");`    
    // // console.log(query);
    // db.run(queryInsert, function(err){
    //   if(!err){
    //     cb(this);
    //   } else {
    //     console.log(err);
    //   }
    // });
    
  }

  static updateGroups(dataUpdate, cb){
    return new Promise((resolve, reject)=>{
      let queryUpdate = `UPDATE Groups SET
                           id = ${dataUpdate.id},
                           name_of_group = "${dataUpdate.name_of_group}"
                         WHERE 
                           id = ${dataUpdate.id}`;
      db.run(queryUpdate, function(err){
        if(err){
          reject(err)
        } else {
          resolve();
        }
      })
    })
    // let queryUpdate = `UPDATE Groups SET
    //                      id = ${dataUpdate.id},
    //                      name_of_group = "${dataUpdate.name_of_group}"
    //                    WHERE 
    //                      id = ${dataUpdate.id}`;
    // db.run(queryUpdate, function(err){
    //   if(!err){
    //     cb();
    //   } else {
    //     console.log(err);
    //   }
    // })
  }

  static deleteGroups(id, cb){
    return new Promise((resolve, reject)=>{
      let queryDelete = `DELETE FROM Groups WHERE id = ${id}`;
      let queryDeleteContactGroup = `DELETE FROM ContactGroup WHERE id_groups = ${id}`;
      //execute query
      db.run(queryDelete,function(err){
        db.run(queryDeleteContactGroup, function(err){
          if(err){
            reject(err)
          } else {
            resolve()
          }
        })
        
      })
    })
    // let queryDelete = `DELETE FROM Groups WHERE id = ${id}`;
    // let queryDeleteContactGroup = `DELETE FROM ContactGroup WHERE id_groups = ${id}`;
    // //execute query
    // db.run(queryDelete,function(err){
    //   db.run(queryDeleteContactGroup, function(err){
    //     if(!err){
    //       cb();
    //     } else {
    //       console.log(err);
    //     }
    //   })
    //   
    // })
  }

}

module.exports = Group;