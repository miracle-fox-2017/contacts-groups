const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Address{

  static findAll(callback){
    db.all(`SELECT * FROM Addresses`,function(err,rowAddresses){
      callback(rowAddresses)
    })

  }
  static inputAddress(request){
    db.run(`INSERT INTO Addresses(city, street, zipcode)
    VALUES ('${request.city}','${request.street}',${request.zipcode})` )
  }
  static findAddress(requestparams, callback){
    db.each(`SELECT * FROM Addresses WHERE id = ${requestparams}`, function(err,rowAddresses){
      callback(rowAddresses)
    })
  }
  static editAddress(requestparams,requestbody){
    db.run(`UPDATE Addresses
      SET city = '${requestbody.city}',
      street = '${requestbody.street}',
      zipcode = ${requestbody.zipcode}
      WHERE id = ${requestparams}
    ` );
  }
  static deleteAddress(requestparams){
    db.run(`DELETE FROM Addresses WHERE id = ${requestparams}`)
  }



}

module.exports = Address
