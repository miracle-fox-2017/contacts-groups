
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');


class Contact {

  static findAll(callback){

    db.all(`SELECT * FROM Contacts`, (err, rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

  static findById(req, callback){

    db.each(`SELECT * FROM Contacts WHERE ID = ${req.params.id}`, (err, rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

  static create(req, callback){
      let name = req.body.name
      if(name.length == 0 ){
        error.is_error = true
        return callback(true)
      }else{
        db.run(`INSERT INTO Contacts (name, company, telp_number, email)
        VALUES("${req.body.name}", "${req.body.company}", "${req.body.telp_number}",
        "${req.body.email}")`, function(err, rows){
          if(err){
            return callback(err)
          }else{
            // untuk ambil lastID
            callback(this)
          }
        })
      }

  }


  static update(req, callback){

    db.run(`UPDATE Contacts SET
      name = '${req.body.name}',
      company = '${req.body.company}',
      telp_number = '${req.body.telp_number}',
      email = '${req.body.email}'
      WHERE ID = ${req.params.id}
      `, (err, rows)=>{
        if(err){
          console.log(err);
        }else{
          callback(rows)
        }
      })
  }

  static destroy(req, callback){
    db.run(`DELETE FROM Contacts WHERE ID = ${req.params.id}`, (err,rows)=>{
      if(err){
        console.log(err);
      }else{
        callback(err, rows)
      }
    })
  }



}


module.exports = Contact;
