
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
  // static findWhere(nameOfColumn, value, callback){
  //   let leftJoin;
  //   if(nameOfColumn === 'GroupsId') {
  //     leftJoin = `Contacts ON Contacts_Groups.ContactsId = Contacts.id`
  //   } else {
  //     leftJoin = `Groups ON Contacts_Groups.GroupsId = Groups.id`
  //   }
  //   let query = `SELECT  * FROM Contacts_Groups
  //               LEFT JOIN ${leftJoin} where ${nameOfColumn} = ${value}`
  //
  //   db.all(query, (err, rows)=>{
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




}


module.exports = Contacts_Groups;
