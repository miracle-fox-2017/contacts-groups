const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/person.db')

class Groups {
  static getall(cb){
    db.all(`SELECT * FROM Grups`,(err,rows)=>{
      cb(rows)
    })
  }

  static addnew(add){
    db.run(`INSERT INTO Grups(name_of_group)
            VALUES('${add.nama}')`)
  }

  static edit (id,cb){
    db.get(`SELECT * FROM Grups WHERE Id_grup = ${id}`,(err,row)=>{
      cb(row)
    })
  }

  static update (id,edit){
    db.run(`UPDATE Grups
      SET name_of_group = '${edit.name}'
      WHERE Id_grup = '${id}';`)
  }

  static addDelete(id){
    db.get(`DELETE FROM Grups
            WHERE Id_grup ='${id}';`)
  }

}



module.exports = Groups;
