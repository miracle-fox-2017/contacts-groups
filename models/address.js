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
  
  static findAllWithContact(cb){
    db.all('SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name, Contacts.company FROM Addresses JOIN Contacts ON Addresses.id_contacts = Contacts.id', function(err,rows){
      if(!err){
        cb(rows)
      } else {
        console.log(err);
      }
    })
  }
  
  static create(body){
    console.log(body);
    db.run(`INSERT INTO Addresses (street, city, zipcode, id_contacts) VALUES ('${body.street}','${body.city}','${body.zipcode}','${body.contactsid}')` );
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