const sqlite3 = require('sqlite3').verbose();
const db= new sqlite3.Database ('./db/database.db')

class Contact {
  static findAll(){
    let query = new Promise((resolve,reject)=>{
      db.all(`SELECT * from Contacts`, (err,row)=> {
        if (!err) {
          resolve(row)
        }
        else {
          reject(err)
        }
      })
    })
    return query
  }

  static insertContact(body){
    let query = new Promise((resolve,reject)=>{
      db.run(`INSERT INTO Contacts(name,company,telp_number,email)
      VALUES ('${body.name}','${body.company}','${body.telp_number}',
      '${body.email}')`, (err,row)=>{
        if (!err) {
          resolve(row)
        }
        else {
          reject(err)
        }
      })
    })
    return query
  }

  static deleteContact(params){
    db.run(`DELETE FROM Contacts WHERE id =${params.id}`)
  }

  static GetInsertContact(params){
    let query = new Promise((resolve,reject)=>{
      db.all(`SELECT * FROM Contacts WHERE id=${params.id}`,(err,row)=>{
        if (!err) {
          resolve(row)
        }
        else {
          reject(err)
        }
      })
    })
    return query
  }
}

module.exports = Contact;

  // static postInsertContact(body,params,cb){
  //     // console.log(params);
  //     db.run(`UPDATE Contacts SET name='${body.name}',
  //       company='${body.company}',
  //       telp_number='${body.telp_number}',
  //       email='${body.email}' WHERE id=${params}`,(err)=>{
  //       if(!err){
  //         cb()
  //       }else{
  //         cb(err);
  //       }
  //     })
  //   }
  // }







// class Contact {
//   constructor() {
//
//   }
//   static findAll(cb){
//     db.all(`SELECT * from Contacts`,(err,row)=>{
//       cb(row)
//     })
//   }
// //kalau mau ammbil data pakai callback
//   static insertContact(body){
//     db.run(`INSERT INTO Contacts(name,company,telp_number,email) VALUES
//     ('${body.name}',
//     '${body.company}',
//     '${body.telp_number}',
//     '${body.email}')`)
//   }
// //======================
//   static deleteContact(params){
//     db.run(`DELETE FROM Contacts WHERE id =${params.id}`)
//   }
//
// //============================
//   static getInsertContact(params,cb){
//     db.all(`SELECT * FROM Contacts WHERE id='${params}'`,(err,row)=>{
//       cb(row)
//     })
//   }
// //====================
//   static postInsertContact(body,params,cb){
//     // console.log(params);
//     db.run(`UPDATE Contacts SET name='${body.name}',
//       company='${body.company}',
//       telp_number='${body.telp_number}',
//       email='${body.email}' WHERE id=${params}`,(err)=>{
//       if(!err){
//         cb()
//       }else{
//         cb(err);
//       }
//     })
//   }
// }
