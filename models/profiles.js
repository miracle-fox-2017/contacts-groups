const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

//username, password
class Profile {

  static findAll(cb){
    let query = `SELECT * FROM Profile`
    db.all(query, (err, rowGroups)=>{
      if(!err){
        cb(null, rowGroups)
      } else {
        cb(err, null)
      }

    })
  }
  static getById(id, cb){
    let query = `SELECT * FROM Profile WHERE id = '${id}'`
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
    let query = `UPDATE Profile SET username = '${data.username}', password = '${data.password}', ContactsId = '${data.ContactsId}' WHERE id = '${id}'`
    db.run(query, err=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  static create(data, cb){
    let query = `INSERT INTO Profile (username, password, ContactsId) VALUES ('${data.username}', '${data.password}','${data.ContactsId}')`
    db.run(query, (err)=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  static remove(id, cb){
    let query = `DELETE FROM Profile WHERE id = '${id}'`
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
module.exports = Profile;
