const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

// name ,company, telp_number , email, namapalah
class Contact {

  static findAll(cb){
    let query = `SELECT * FROM Contacts`
    db.all(query, (err, rowGroups)=>{
      if(!err){
        cb(null, rowGroups)
      } else {
        cb(err, null)
      }
    })
  }
  static getById(id, cb){
    let query = `SELECT * FROM Contacts WHERE id = '${id}'`
    db.get(query, (err, rows)=>{
      if(!err){
        cb(null,rows)
      } else {
        cb(err)
        console.log(err);
      }
    })
  }
  static findWhere(){

  }
  static update(id,data,cb){
    let query = `UPDATE Contacts SET name = '${data.name}', company = '${data.company}',telp_number = '${data.telp_number}',email = '${data.email}' WHERE id = '${id}'`
    db.run(query, err=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  static create(data, cb){
    let query = `INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${data.name}','${data.company}','${data.telp_number}','${data.email}')`
    db.run(query, function(err, dataContact){
      if(!err){
        cb(null,this.lastID)
      } else {
        cb(err,null)
      }
    })
  }
  static remove(id, cb){
    let query = `DELETE FROM Contacts WHERE id = '${id}'`
    db.run(query, err =>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }

  //END
}
module.exports = Contact;
