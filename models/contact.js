const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class Contact {
  constructor(){}
  
  static showContacts(cb){
    let q = `SELECT * FROM Contacts`;
    db.all(q, function(err, showContacts){
      // callback here
      if(!err){
        cb(showContacts);
      } else {
        console.log(err);
      }
    })
  }
  
  static insertContacts(dataInsert, cb){
    let queryInsert = `INSERT INTO Contacts
                       (name, company, telp_number, email)
                       VALUES
                       ("${dataInsert.name}", "${dataInsert.company}", "${dataInsert.telp_number}", "${dataInsert.email}");`
    
    // console.log(query);
    db.run(queryInsert, function(err){
      if(!err){
        cb(this);
      } else {
        console.log(err);
      }
    });

  }
  
  static showSpecificId(id, cb){
    let showSpecificId = `SELECT * FROM Contacts WHERE id=${id}`;
    //execute query
    db.all(showSpecificId, (err, contacts)=>{
      if(!err){
        cb(contacts);
      } else {
        console.log(err);
      }
    })
  }
  
  static updateContact(dataUpdate, cb){
    let queryUpdate = `UPDATE Contacts SET
                        id = ${dataUpdate.id},
                        name = "${dataUpdate.name}",
                        company = "${dataUpdate.company}",
                        telp_number = "${dataUpdate.telp_number}",
                        email = "${dataUpdate.email}"
                      WHERE 
                        id = ${dataUpdate.id}`;
    db.run(queryUpdate, function(err){
      if(!err){
        cb();
      } else {
        console.log(err);
      }
    })
  }

  static deleteContact(id, cb){
    let queryDelete = `DELETE FROM Contacts WHERE id = ${id}`;
    let queryDeleteContactGroup = `DELETE FROM ContactGroup WHERE id_contacts = ${id}`;
                 
    //execute query
    db.run(queryDelete,function(err){
      db.run(queryDeleteContactGroup, function(err){
        if(!err){
          cb();
        } else {
          console.log(err);
        }
      })
      
    })
  }

}

module.exports = Contact;