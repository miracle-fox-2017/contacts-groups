var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');



class Address {


  static findAll(callback){
    db.all(`SELECT Addresses.*, Contacts.name, Contacts.id as
      ContactId FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId`, (err, rows) => {
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

  static create(req, callback){
    db.run(`INSERT INTO Addresses (street, city, zipcode, ContactId)
    VALUES ('${req.body.street}','${req.body.city}', ${req.body.zipcode}, ${req.body.ContactId})`, (err, rows) => {
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }

  static findById(req, callback){
    db.each(`SELECT * FROM Addresses WHERE ID = ${req.params.id}`, (err, rows) => {
      if(err){
        console.log(err);
      }else{
        callback(rows)
      }
    })
  }



  static update(req, callback){
    console.log(req);
    db.run(`UPDATE Addresses SET
      city = '${req.body.city}',
      street = '${req.body.street}',
      zipcode = ${req.body.zipcode},
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
    db.run(`DELETE FROM Addresses WHERE ID = ${req.params.id}`, (err,rows) => {
      if(!err){
        callback(rows)
      }
    })
  }

}




module.exports = Address;
