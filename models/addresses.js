
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Addresses{
  static findAll(){
    let query = `SELECT Addresses.*,Contacts.name FROM Addresses LEFT JOIN
                  Contacts ON Contacts.id = Addresses.contacts_id`;
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
    let query = `INSERT INTO Addresses (street, city, zipcode, contacts_id)
                 VALUES("${obj.street}", "${obj.city}", "${obj.zipcode}","${obj.contacts_id}")`;
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
               zipcode = "${obj.zipcode}",
               contacts_id = "${obj.contacts_id}"
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
