
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Addresses{
  static findAll(){
    let query = `SELECT * FROM Addresses`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,addressesRows)=>{
        if(!err){
          resolve(addressesRows)
        }else{
          reject(err)
        }
      })
    })
  }
  static create(obj){
    let query = `INSERT INTO Addresses (street, city, zipcode)
                 VALUES("${obj.street}", "${obj.city}", "${obj.zipcode}")`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,addressesRows)=>{
        if(!err){
          resolve(addressesRows)
        }else{
          reject(err)
        }
      })
    })
  }

  static delete(id){
    let query = `DELETE FROM Addresses
                 WHERE id = ${id}`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,addressesRows)=>{
        if(!err){
          resolve(addressesRows)
        }else{
          reject(err)
        }
      })
    })
  }

  static findById(id){
    let query = `SELECT * FROM Addresses where id = "${id}"`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,addressesRows)=>{
        if(!err){
          resolve(addressesRows)
        }else{
          reject(err)
        }
      })
    })
  }

  static update(obj){
    let query = `UPDATE Addresses
               SET street = "${obj.street}",
               city = "${obj.city}",
               zipcode = "${obj.zipcode}"
               WHERE id = "${obj.id}"`;
   return new Promise((resolve,reject)=>{
     db.all(query,(err,addressesRows)=>{
       if(!err){
         resolve(addressesRows)
       }else{
         reject(err)
       }
     })
   })
  }
}

module.exports = Addresses
