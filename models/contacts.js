
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');

class Contact {

  static findAll(){
   return new  Promise ((resolve, reject) =>{
     db.all(`SELECT * FROM Contacts`, (err, rows)=>{
       if(err){
         reject(err);
       }else{
         resolve(rows)
       }
     })
   })
  }

  static findById(req){
    return new Promise ((resolve, reject) =>{
      db.each(`SELECT * FROM Contacts WHERE ID = ${req.params.id}`, (err, rows)=>{
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }

  static create(req, callback){
    return new Promise((resolve , reject) =>{
      let name = req.body.name
      if(name.length == 0 ){
        error.is_error = true
        reject(true)
      }else{
        db.run(`INSERT INTO Contacts (name, company, telp_number, email)
        VALUES("${req.body.name}", "${req.body.company}", "${req.body.telp_number}",
        "${req.body.email}")`, function(err, rows){
          if(err){
            console.log(err)
          }else{
            // untuk ambil lastID
            resolve(this)
          }
        })
      }

    })

  }


  static update(req){
    return new Promise ((resolve, reject) =>{
      db.run(`UPDATE Contacts SET
        name = '${req.body.name}',
        company = '${req.body.company}',
        telp_number = '${req.body.telp_number}',
        email = '${req.body.email}'
        WHERE ID = ${req.params.id}
        `, (err, rows)=>{
          if(err){
            reject(err);
          }else{
            resolve()
          }
      })
    })

  }

  static destroy(req){
    return new Promise ((resolve, reject) =>{
      db.run(`DELETE FROM Contacts WHERE ID = ${req.params.id}`, (err,rows)=>{
        if(err){
          reject(err);
        }else{
          resolve()
        }
      })
    })

  }



}


module.exports = Contact;
