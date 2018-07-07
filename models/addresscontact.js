const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/database.db')



class AddressContact{


  static findAll(callback){
    // console.log(rowProfiles);
    db.all(`SELECT Addresses.ID,Contacts.Name,Contacts.Company,Addresses.city,Addresses.street, Addresses.zipcode, Addresses.contact_id FROM Addresses LEFT JOIN Contacts ON Addresses.contact_id = Contacts.ID`, function(err, rowAddresses){
      if(!err){
      callback(rowAddresses)
    }else{
        console.log(err)
      }
    } );
  }
}

module.exports= AddressContact
