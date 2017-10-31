const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Profile {
  // static gettable(table,call){
  //   db.all(`SELECT * FROM ${table}`,(err,rowstable)=>{
  //     call(rowstable)
  //   })
  // }

  static getall(){ //buat join table bisa pake left atau inner
    //dicoba dlu takut masih salah
    return new Promise((resolve,reject)=>{
      db.all(`SELECT Profile.Id_profile, Profile.Username, Profile.Password, Contacts.Name
        FROM Profile LEFT JOIN Contacts ON Profile.ContactID=Contacts.ID`,(err,rows)=>{
        // console.log(rows);
        if(err){ reject(err) }
        else{ resolve(rows) }
      })
    })
  }

  static addnew(add){
    return new Promise((resolve,reject)=>{
    db.run(`INSERT INTO Profile(Username,Password,ContactID)
            VALUES('${add.username}','${add.password}','${add.contactid}')`,function(err){
              if (err){resolve(err)}
            })
    })
  }

  static edit (id){
    return new Promise((reject,resolve)=>{
      db.get(`SELECT * FROM Profile WHERE Id_profile = ${id}`,(err,row)=>{
        if (err){ reject(err) }
        else{ resolve(row) }
      })
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
