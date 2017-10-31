const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

//name_of_group
class Group {

  static findAll(){
    return new Promise((resolve, reject)=> {
      let query = `SELECT * FROM Groups`
      db.all(query, (err, rowGroups)=>{
        if(!err){
          resolve(rowGroups)
        } else {
          reject(err)
        }

      })
    });
  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Groups WHERE id = '${id}'`
      db.get(query, (err, rows)=>{
        if(!err){
          resolve(rows)
        } else {
          reject(err)
        }
      })
    });
  }
  static findWhere(){

  }
  static update(id,data){
    return new Promise(function(resolve, reject) {
      let query = `UPDATE Groups SET name_of_group = '${data.name_of_group}' WHERE id = '${id}'`
      db.run(query, err=>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }
  static create(data){
    return new Promise(function(resolve, reject) {
      let query = `INSERT INTO Groups (name_of_group) VALUES ('${data.name_of_group}')`
      db.run(query, (err)=>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }
  static remove(id){
    return new Promise(function(resolve, reject) {
      let query = `DELETE FROM Groups WHERE id = '${id}'`
      db.run(query, err =>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }

  //END
}
module.exports = Group;
