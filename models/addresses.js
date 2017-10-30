const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

//sreet, city, zipcode
class Address {

  static findAll(cb){
    let query = `SELECT * FROM Addresses`
    db.all(query, (err, rowGroups)=>{
      if(!err){
        cb(null, rowGroups)
      } else {
        cb(err, null)
      }
    })
  }
  static getById(id, cb){
    let query = `SELECT * FROM Addresses WHERE id = '${id}'`
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
    let query = `UPDATE Addresses SET street = '${data.street}', city ='${data.city}', zipcode = '${data.zipcode}', ContactsId = '${data.ContactsId}' WHERE id = '${id}'`
    db.run(query, err=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  static create(data){
    // console.log(data)
    let query = `INSERT INTO Addresses (street, city, zipcode, ContactsId) VALUES ('${data.street}','${data.city}','${data.zipcode}',${data.ContactsId})`
    db.run(query, (err)=>{
      if(err){
        throw err;
      }
    })
  }
  static remove(id, cb){
    let query = `DELETE FROM Addresses WHERE id = '${id}'`
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
module.exports = Address;
