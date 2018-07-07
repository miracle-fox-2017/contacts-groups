const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')

class Address{


  static findAllwithContact(callback){
    // console.log(rowProfiles);
    db.all(`SELECT Addresses.ID,Addresses.city,Addresses.street, Addresses.zipcode,Contacts.Name, Addresses.contact_id FROM Addresses INNER JOIN Contacts ON Addresses.contact_id = Contacts.ID`, function(err, rowAddresses){
      if(!err){
      callback(rowAddresses)
    }else{
        console.log(err)
      }
    } );
  }

  static inputAddress(request,callback){
    db.run(`INSERT INTO Addresses(city, street, zipcode, contact_id)
    VALUES ('${request.city}','${request.street}',${request.zipcode}, ${request.contactsID})`, function(err){
      if(err){
        callback(err)
      }
    } )
  }
  static findAddress(requestparams, callback){
    db.each(`SELECT * FROM Addresses WHERE id = ${requestparams}`, function(err,rowAddresses){
      callback(err,rowAddresses)
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
  static deleteAddress(requestparams,callback){
    db.run(`DELETE FROM Addresses WHERE id = ${requestparams}`,function(err,rowAddresses){
      callback(err,rowAddresses)
    })
  }



}

module.exports = Address
