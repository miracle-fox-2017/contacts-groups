const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Profile {
  static getall(cb){
    db.all(`SELECT * FROM Profile`,(err,rows)=>{
      console.log(rows);
      cb(rows)
    })
  }

  static addnew(add){
    db.run(`INSERT INTO Profile(Username,Password)
            VALUES('${add.username}','${add.password}')`)
  }

  static edit (id,cb){
    db.get(`SELECT * FROM Profile WHERE Id_profile = ${id}`,(err,row)=>{
      cb(row)
    })
  }

  static update (id,edit){
    db.run(`UPDATE Profile
      SET Username = '${edit.username}',Password ='${edit.password}'
      WHERE Id_profile = '${id}';`)
  }

  static addDelete(id){
    db.get(`DELETE FROM Profile
            WHERE Id_profile ='${id}';`)
  }

}



module.exports = Profile;
