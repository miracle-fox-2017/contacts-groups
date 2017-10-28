
// const express =  require ('express')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')
class Contacts {
  static getall (cb){
    db.all(`SELECT * FROM Contacts`,(err,rows) => {

      // let data = rows
      // console.log(rows);
      cb(rows)
    })
  }

  static addnew (add){
    db.run(`INSERT INTO Contacts (Name,Company,Telp_Number,Email)
            VALUES('${add.nama}','${add.company}','${add.telp}','${add.email}')`)
  }

  static edit (id,cb){
    db.get(`SELECT * FROM Contacts WHERE ID = ${id}`,(err,row) =>{
      cb(row)
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
