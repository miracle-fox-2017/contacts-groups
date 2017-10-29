const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Profile {
  static gettable(table,call){
    db.all(`SELECT * FROM ${table}`,(err,rowstable)=>{
      call(rowstable)
    })
  }

  static getall(cb){ //buat join table bisa pake left atau inner
    //dicoba dlu takut masih salah
    db.all(`SELECT Profile.Id_profile, Profile.Username, Profile.Password, Contacts.Name
      FROM Profile LEFT JOIN Contacts ON Profile.ContactID=Contacts.ID`,(err,rows)=>{
      console.log(rows);
      cb(rows)
    })
  }

  static addnew(add){

    db.run(`INSERT INTO Profile(Username,Password,ContactID)
            VALUES('${add.username}','${add.password}','${add.contactid}')`)
  }

  static edit (id,cb){
    db.get(`SELECT * FROM Profile WHERE Id_profile = ${id}`,(err,row)=>{
      cb(row)
    })
  }

  static update (id,edit){
    db.run(`UPDATE Profile
      SET Username = '${edit.username}',Password ='${edit.password}',ContactID ='${edit.contactid}'
      WHERE Id_profile = '${id}';`)
  }

  static addDelete(id){
    db.get(`DELETE FROM Profile
            WHERE Id_profile ='${id}';`)
  }

}



module.exports = Profile;
