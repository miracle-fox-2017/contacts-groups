const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

// name ,company, telp_number , email, namapalah
class Contact {

  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Contacts`
      db.all(query, (err, rowGroups)=>{
        if(!err){
          resolve(rowGroups)
        } else {
          reject(err)
        }
      })
    });
  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Contacts WHERE id = '${id}'`
      db.get(query, (err, rows)=>{
        if(!err){
          resolve(rows)
        } else {
          reject(err)
        }
      })
    });
  }
  static findWhere(){

  }
  static update(id,data){
    return new Promise(function(resolve, reject) {
      let query = `UPDATE Contacts SET name = '${data.name}', company = '${data.company}',telp_number = '${data.telp_number}',email = '${data.email}' WHERE id = '${id}'`
      db.run(query, err=>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }
  static create(data){
    return new Promise(function(resolve, reject) {
      let query = `INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${data.name}','${data.company}','${data.telp_number}','${data.email}')`
      db.run(query, function(err, dataContact){
        if(!err){
          resolve(this.lastID)
        } else {
          reject(err)
        }
      })
    });
  }
  static remove(id){
    return new Promise(function(resolve, reject) {
      let query = `DELETE FROM Contacts WHERE id = '${id}'`
      db.run(query, err =>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }

  //END
}
module.exports = Contact;
