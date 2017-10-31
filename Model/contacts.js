
// const express =  require ('express')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Contacts {
  static getall (){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM Contacts`,(err,rows) => {
        if(err){ reject(err) }
        else{ resolve(rows) }
      })
    })

  }

  static addnew (add){
    return new Promise((resolve,reject)=>{
      db.run(`INSERT INTO Contacts (Name,Company,Telp_Number,Email)
              VALUES('${add.nama}','${add.company}','${add.telp}','${add.email}')`,function(err){
                if (!err){ resolve(this) };
                // else{ resolve(this) }
              })
    })

  }

  static findbyid(id){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM Contacts WHERE ID ='${id}'`,(err,rowsbyid) => {
        if(err){
          reject(err)
        } else { resolve(rowsbyid) }
      })
    })
  }

  static edit (id){
    return new Promise ((resolve,reject)=>{
      db.get(`SELECT * FROM Contacts WHERE ID = ${id}`,(err,row) =>{
        if (err){ reject(err) }
        else{ resolve(row) }
      })
    })

  }

  static update (id,edit){
    db.run(`UPDATE Contacts
      SET Name = '${edit.name}', Company = '${edit.company}',Telp_Number = '${edit.telp}',Email ='${edit.email}'
      WHERE ID = '${id}';`)
  }

  static addDelete(id){
    db.get(`DELETE FROM Contacts
              WHERE ID ='${id}';`)
  }

}

// Contacts.getall()
module.exports = Contacts;
