const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/data.db');

class Contacts{
  static findAll(cb){
    let query = `SELECT * FROM Contacts`;
    db.all(query,function(err,rowContacts){
      if(!err){
        cb(null,rowContacts)
      }else{
        console.log(err)
      }
    })
  }
  
  static create(obj,cb){
    let query = `INSERT INTO Contacts (name,company,telp_number,email)
                 VALUES("${obj.name}", "${obj.company}", "${obj.telp_number}", "${obj.email}")`;
    db.all(query,function(err,rowContacts){
      if(!err){
        cb(null,rowContacts)
      }else{
        console.log(err)
      }
    })
  }

  static findById(id,cb) {
    let query = `SELECT * FROM Contacts where id = "${id}`;
    db.all(query, function(err, rowContacts) {
      if(!err) {
        cb(null, rowContacts)
      } else {
        console.log(err)
      }
    })
  } 

  static Update(request, callback){
    db.all(`SELECT * FROM Contacts where id = "${request.params}"`,function(err,rowContacts){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rowContacts)
      }
  })
}
static EditPost(Obj, callback){
db.all(`UPDATE Contacts SET name = "${Obj.name}",
        company = "${Obj.company}",
        telp_number = "${Obj.telp_number}",
        email = "${Obj.email}" WHERE id = "${Obj.id}"`, function (err,rowContacts){
    if(err){
      callback(err,null)
    }
    else{
      callback(null, rowContacts)
    }
  })
}

  

  static remove(id,cb){
    let query = `DELETE FROM Contacts
                 WHERE id = ${id}`;
    db.all(query,function(err,rowContacts){
      if(!err){
        cb(null,rowContacts)
      }else{
        console.log(err)
      }
    })
  }
}

module.exports = Contacts