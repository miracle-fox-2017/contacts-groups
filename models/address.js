var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

class Address {
  static findAll(cb){
    db.all(`SELECT * FROM Addresses`, function(err, rows){
      if(!err){
        cb(rows)
      } else {
        console.log(err);
      }
    })
  }
  
  static create(body){
    db.run(`INSERT INTO Addresses (street, city, zipcode) VALUES ('${body.street}','${body.city}','${body.zipcode}')` );
  }
  
  static findID(params,cb){
    db.each(`SELECT * FROM Addresses WHERE id = ${params}`, function(err, rows){
      if(!err){
        cb(rows)
      }
    })
  }
  
  static update(body, params){
    db.run(`UPDATE Addresses SET street = '${body.street}', city = '${body.city}', zipcode = '${body.zipcode}' WHERE id = ${params}`);
  }
  
  static remove(params){
    db.each(`DELETE FROM Addresses WHERE id = ${params}`, function(err, rows){
      if(err){
        console.log(err);
      }
    })
  }
  
}

module.exports = Address