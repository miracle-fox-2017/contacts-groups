"use strict"
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Contacts{
  static findAll(){
    let query = `SELECT * FROM Contacts`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,contactsRows)=>{
        if(!err){
          resolve(contactsRows)
        }else{
          reject(err)
        }
      })
    })
  }
  static create(obj){
    let query = `INSERT INTO Contacts (name,company,telp_number,email)
                 VALUES("${obj.name}", "${obj.company}", "${obj.telp_number}", "${obj.email}")`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,contactsRows)=>{
        if(!err){
          resolve(contactsRows)
        }else{
          reject(err)
        }
      })
    })
  }

  static delete(id){
    let query = `DELETE FROM Contacts
                 WHERE id = ${id}`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,contactsRows)=>{
        if(!err){
          resolve(contactsRows)
        }else{
          reject(err)
        }
      })
    })
  }

  static findById(id){
    let query = `SELECT * FROM Contacts where id = "${id}"`;
    return new Promise((resolve,reject)=>{
      db.all(query,(err,contactsRows)=>{
        if(!err){
          resolve(contactsRows)
        }else{
          reject(err)
        }
      })
    })
  }

  static update(obj){
    let query = `UPDATE Contacts
               SET name = "${obj.name}",
               company = "${obj.company}",
               telp_number = "${obj.telp_number}",
               email = "${obj.email}"
               WHERE id = "${obj.id}"`;
   return new Promise((resolve,reject)=>{
     db.all(query,(err,contactsRows)=>{
       if(!err){
         resolve(contactsRows)
       }else{
         reject(err)
       }
     })
   })
  }
}

module.exports = Contacts
