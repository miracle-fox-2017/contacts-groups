const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/person.db')

class GroupContact {
  static getall(cb){
    db.all(`SELECT * FROM GroupContact`,(err,rows) =>{
      cb(rows)
    })
  }

  static gettableall(table){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT * FROM ${table}`,(err,row)=>{
        if (err) { reject(err) }
        else { resolve(row) }
      })
    })
  }

  static addnew (idgroup,idcontact){
  db.run(`INSERT INTO GroupContact (groupId,ContactID)
          VALUES('${idgroup}','${idcontact}')`)
  }

  static gettable(){
    return new Promise ((resolve,reject)=>{
      db.all(`SELECT  GroupContact.groupId, GroupContact.ContactID,
              Grups.Id_grup,Grups.name_of_group FROM GroupContact
              LEFT JOIN Grups ON GroupContact.groupId = Grups.Id_grup`,
              (err,rows)=>{ resolve (rows)  })
    })
    }

}

module.exports = GroupContact;
