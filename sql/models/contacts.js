const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


class Contacts {
    static findAll(callback){
      db.all(`SELECT * FROM Contacts`,function(err,rows){

          if(err){
            callback(err, null)
          }
          else{
            callback(null, rows)
          }
      })
    }
    static Create(data, callback){
      db.all(`INSERT INTO Contacts (name,company,telp_number,email)
              VALUES("${data.name}", "${data.company}", "${data.phoneNumber}", "${data.email}")`,function(err, rows){
              if(err) {
                callback(err, null);
              }
              else {
                callback(null, rows)
              }
        })
    }
    static Update(request, callback){
      db.all(`SELECT * FROM Contacts where id = "${request.params}"`,function(err,rows){
        if(err){
          callback(err,null)
        }
        else{
          callback(null, rows)
        }
    })
  }
  static EditPost(Obj, callback){
  db.all(`UPDATE Contacts SET name = "${Obj.name}",
          company = "${Obj.company}",
          telp_number = "${Obj.phoneNumber}",
          email = "${Obj.email}" WHERE id = "${Obj.id}"`, function (err,rows){
      if(err){
        callback(err,null)
      }
      else{
        callback(null, rows)
      }
    })
  }
  static Remove(Obj, callback){
    db.all(`DELETE FROM Contacts
            WHERE id = "${Obj.id}"`, function (err, rows){
        if(err){
          callback(err,null);
        }
        else{
          callback(null,rows);
        }
    });
  }
}
module.exports = Contacts
