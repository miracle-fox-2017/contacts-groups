var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');



class Profile {



  static findAll(callback){
    db.all(`SELECT Profile.*, Contacts.name, Contacts.id as
            ContactId FROM Profile LEFT JOIN
            Contacts ON Contacts.id = Profile.ContactId`, (err, rows) => {
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

  static create(req, callback){

    db.run(`INSERT INTO Profile (username, password, ContactId)
    VALUES ('${req.body.username}','${req.body.password}', ${req.body.ContactId})`, (err) => {
      if(err){
        let msg = 'Contact sudah Terpakai'
        callback(msg);
      }else{
        callback(err)
      }
    })
  }
  //
  static findById(req, callback){
    db.each(`SELECT * FROM Profile WHERE ID = ${req.params.id}`, (err, rows) => {
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }



  static update(req, callback){
    console.log(req);
    db.run(`UPDATE Profile SET
      username = '${req.body.username}',
      password = '${req.body.password}',
      ContactId = '${req.body.ContactId}'
      WHERE ID = ${req.params.id}`, (err, rows)=>{
        if(err){
          console.log(err);
        }else{
          callback(rows)
        }
    })
  }

  static destroy(req, callback){
    db.run(`DELETE FROM Profile WHERE ID = ${req.params.id}`, (err,rows) => {
      if(!err){
        callback(rows)
      }
    })
  }

}




module.exports = Profile;
