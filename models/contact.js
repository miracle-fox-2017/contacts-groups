var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Contact {
  
  static findAll(cb){
    db.all(`SELECT * FROM Contacts`, function(err, rows)
    {
      cb(rows)
    })
  }
  
  static create(body){
    // console.log(body);
    db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES ('${body.name}','${body.company}','${body.telp_number}','${body.email}')` );
  }
  
  static findID(params, cb){
    db.each(`SELECT * FROM Contacts WHERE id = ${params}`, function(err, rows){
      if(!err){
        cb(rows)
      } else {
        console.log(err);
      }
    })
  }
  
  static update(body,params){
    console.log(params);
    db.run(`UPDATE Contacts SET name = '${body.name}', company = '${body.company}', telp_number = '${body.telp_number}', email = '${body.email}' WHERE id = ${params}`);
  }
  
  static remove(params, cb){
    db.each(`DELETE FROM Contacts WHERE id = ${params}`);
  }
  
}

module.exports = Contact