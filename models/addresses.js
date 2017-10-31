const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

//sreet, city, zipcode
class Address {

  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Addresses`
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
      let query = `SELECT * FROM Addresses WHERE id = '${id}'`
      db.get(query, (err, rows)=>{
        if(!err){
          resolve(null,rows)
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
      let query = `UPDATE Addresses SET street = '${data.street}', city ='${data.city}', zipcode = '${data.zipcode}', ContactsId = '${data.ContactsId}' WHERE id = '${id}'`
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
      let query = `INSERT INTO Addresses (street, city, zipcode, ContactsId) VALUES ('${data.street}','${data.city}','${data.zipcode}',${data.ContactsId})`
      db.run(query, (err)=>{
        if(err){
          reject(err)
        } else {
          resolve()
        }
      })
    });
  }
  static remove(id){
    return new Promise(function(resolve, reject) {
      let query = `DELETE FROM Addresses WHERE id = '${id}'`
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
module.exports = Address;
