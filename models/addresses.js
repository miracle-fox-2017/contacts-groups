const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

class Address{
  static findAll(callBack){
    db.all(`SELECT * FROM addresses`, function(err, rowsAddress){
      callBack(err, rowsAddress)
    })
  }

  static addAddress(body){
    let street = body.street
    let city = body.city
    let zipcode = body.zipcode
    let queryAddress = `INSERT INTO addresses (street, city, zipcode) VALUES ('${street}', '${city}', '${zipcode}')`
    db.run(queryAddress)
  }

  static formEditAddress(params, callBack){
    let queryEditAddress = `SELECT * FROM Addresses WHERE id=${params}`
    db.each(queryEditAddress, function(err, rowsEditAddress){
      callBack(err, rowsEditAddress)
    })
  }

  static editAddress(params, body){
    let street = body.street
    let city = body.city
    let zipcode = body.zipcode
    let updateAddress = `UPDATE Addresses SET street = "${street}", city = "${city}",
                          zipcode = "${zipcode}" WHERE id = "${params}"`
    db.all(updateAddress)
  }

  static hapusAddress(params){
    let deleteAddress = `DELETE FROM Addresses WHERE id = "${params}"`
    db.all(deleteAddress)
  }
}

module.exports = Address
