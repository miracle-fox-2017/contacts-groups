const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Contacts{
  static findAll(cb){
    let query = `SELECT * FROM Contacts`;
    db.all(query,function(err,contactsRows){
      if(!err){
        cb(null,contactsRows)
      }else{
        console.log(err)
      }
    })
  }

  static create(obj,cb){
    let query = `INSERT INTO Contacts (name,company,telp_number,email)
                 VALUES("${obj.name}", "${obj.company}", "${obj.telp_number}", "${obj.email}")`;
    db.all(query,function(err,contactsRows){
      if(!err){
        cb(null,contactsRows)
      }else{
        console.log(err)
      }
    })
  }

  static delete(id){
    let query = `DELETE FROM Contacts
                 WHERE id = ${id}`;
    db.all(query)
  }

  static findById(id,cb){
    let query = `SELECT * FROM Contacts where id = "${id}"`;
    db.all(query,function(err,contactsRows){
      if(!err){
        cb(null,contactsRows)
      }else{
        console.log(err)
      }
    })
  }

  static update(obj){
    let query = `UPDATE Contacts
               SET name = "${obj.name}",
               company = "${obj.company}",
               telp_number = "${obj.telp_number}",
               email = "${obj.email}"
               WHERE id = "${obj.id}"`;
   db.all(query)
  }
}

module.exports = Contacts
