var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');



class Profile {



  static findAll(){
    return new Promise ((resolve, reject) =>{
      db.all(`SELECT Profile.*, Contacts.name, Contacts.id as
              ContactId FROM Profile LEFT JOIN
              Contacts ON Contacts.id = Profile.ContactId`, (err, rows) => {
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }

  static create(req){
    return new Promise ((resolve, reject) =>{
      db.run(`INSERT INTO Profile (username, password, ContactId)
      VALUES ('${req.body.username}','${req.body.password}', ${req.body.ContactId})`, (err) => {
        if(err){
          let msg = 'Contact sudah Terpakai'
          reject(msg);
        }else{
          resolve(err)
        }
      })
    })
  }
  //
  static findById(req){
    return new Promise ((resolve, reject) =>{
      db.each(`SELECT * FROM Profile WHERE ID = ${req.params.id}`, (err, rows) => {
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }



  static update(req){
    return new Promise ((resolve, reject) =>{
      db.run(`UPDATE Profile SET
      username = '${req.body.username}',
      password = '${req.body.password}',
      ContactId = '${req.body.ContactId}'
      WHERE ID = ${req.params.id}`, (err, rows)=>{
        if(err){
          let msg = 'Contact Id Sudah Terpakai'
          reject(msg);
        }else{
          resolve(err)
        }
      })
    })

  }

  static destroy(req){
    return new Promise ((resolve, reject) =>{
      db.run(`DELETE FROM Profile WHERE ID = ${req.params.id}`, (err,rows) => {
        if(!err){
          resolve(rows)
        }
      })
    })
  }
}




module.exports = Profile;
