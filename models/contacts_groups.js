
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');


class Contacts_Groups {

  static findAll(callback){

    db.all(`SELECT Contacts_Groups.*, Groups.name_of_group FROM Contacts_Groups LEFT JOIN
            Groups ON Groups.id = Contacts_Groups.GroupsId`, (err, rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }
  //
  // static findById(req, callback){
  //
  //   db.each(`SELECT * FROM Contacts WHERE ID = ${req.params.id}`, (err, rows)=>{
  //     if(err){
  //       console.log(err);
  //     }else{
  //       callback(rows)
  //     }
  //   })
  // }

  static create(idC, idG, callback){
    console.log(idC);
     db.run(`INSERT INTO Contacts_Groups (ContactsId, GroupsId)
    VALUES(${idC}, ${idG})`, (err, rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

  // static insert (req, callback){
  //   console.log(req.params.id);
  //   db.run(`INSERT INTO Contacts_Groups (ContactsId)
  //   VALUES(${req.params.id})`, (err, rows) =>{
  //     if(err){
  //       console.log(err);
  //     }else{
  //       callback(rows)
  //     }
  //   })
  // }

  // static update(req, callback){
  //
  //   db.run(`UPDATE Contacts SET
  //     name = '${req.body.name}',
  //     company = '${req.body.company}',
  //     telp_number = '${req.body.telp_number}',
  //     email = '${req.body.email}'
  //     WHERE ID = ${req.params.id}
  //     `, (err, rows)=>{
  //       if(err){
  //         console.log(err);
  //       }else{
  //         callback(rows)
  //       }
  //     })
  // }
  //
  // static destroy(req, callback){
  //   db.run(`DELETE FROM Contacts WHERE ID = ${req.params.id}`, (err,rows)=>{
  //     if(err){
  //       console.log(err);
  //     }else{
  //       callback(err, rows)
  //     }
  //   })
  // }
  //


}


module.exports = Contacts_Groups;
