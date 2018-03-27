
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');


class Contacts_Groups {

  static findAll(){
    return new Promise ((resolve, reject) =>{
      db.all(`SELECT Contacts_Groups.*, Groups.name_of_group FROM Contacts_Groups LEFT JOIN
              Groups ON Groups.id = Contacts_Groups.GroupsId`, (err, rows)=>{
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }

  static create(idC, idG){
    return new Promise ((resolve, reject) =>{
      db.run(`INSERT INTO Contacts_Groups (ContactsId, GroupsId)
     VALUES(${idC}, ${idG})`, (err, rows)=>{
       if(err){
         reject(err);
       }else{
         resolve(rows)
       }
     })
    })

  }




}


module.exports = Contacts_Groups;
