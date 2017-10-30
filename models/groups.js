const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

//name_of_group
class Group {

  static findAll(cb){
    let query = `SELECT * FROM Groups`
    db.all(query, (err, rowGroups)=>{
      if(!err){
        cb(null, rowGroups)
      } else {
        cb(err, null)
      }

    })
  }
  static getById(id, cb){
    let query = `SELECT * FROM Groups WHERE id = '${id}'`
    db.get(query, (err, rows)=>{
      if(!err){
        cb(null,rows)
      } else {
        cb(err)
        console.log(err);
      }
    })
  }
  static findWhere(){

  }
  static update(id,data,cb){
    let query = `UPDATE Groups SET name_of_group = '${data.name_of_group}' WHERE id = '${id}'`
    db.run(query, err=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  static create(data, cb){
    let query = `INSERT INTO Groups (name_of_group) VALUES ('${data.name_of_group}')`
    db.run(query, (err)=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  static remove(id, cb){
    let query = `DELETE FROM Groups WHERE id = '${id}'`
    db.run(query, err =>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }

  //END
}
module.exports = Group;
