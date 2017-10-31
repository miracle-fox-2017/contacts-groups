const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Group{


  static findAll(callback){
    db.all(`SELECT * FROM Groups`,function(err,rowGroups){
      callback(rowGroups)
    })
  }

  static inputGroup(request){
    db.run(`INSERT INTO Groups(name_of_group)
    VALUES ('${request.name_of_group}')` )
  }
  static findID(requestparam,callback){
    db.each(`SELECT * FROM Groups WHERE id = ${requestparam}`, function(err,rowAddresses){
      callback(rowAddresses)
    })
  }
  static editGroup(requestparams,requestbody){
    db.run(`UPDATE Groups
      SET name_of_group = '${requestbody.name_of_group}'
      WHERE id = ${requestparams}
    ` )
  }
  static deleteGroup(requestparams){
    db.run(`DELETE FROM Groups WHERE id = ${requestparams}`)
  }

}




module.exports = Group
