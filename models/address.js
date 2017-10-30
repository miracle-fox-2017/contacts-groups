const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class Address {
  constructor(){}
  
  static showAddress(cb){
    let q = `SELECT * FROM Addresses`;
    db.all(q, function(err, rows){
      cb(rows);
      // console.log(rows);
      // console.log('heloo');
    })
  }

  static insertAddress(dataInsert, cb){
    let queryInsert = `INSERT INTO Addresses
                       (street, city, zipcode, id_contacts)
                       VALUES
                       ("${dataInsert.street}", "${dataInsert.city}",
                        "${dataInsert.zipcode}", "${dataInsert.id_contacts}");`    
    // console.log(query);
    db.run(queryInsert, function(err){
      cb(this);
    });
    
  }

  static updateAddress(dataUpdate, cb){
    let queryUpdate = `UPDATE Addresses SET
                  id = ${dataUpdate.id},
                  street = "${dataUpdate.street}",
                  city = "${dataUpdate.city}",
                  zipcode = ${dataUpdate.zipcode},
                  id_contacts = ${dataUpdate.id_contacts}
                WHERE 
                  id = ${dataUpdate.id}`;
    db.run(queryUpdate, function(err){
      cb(err);
    })
  }

  static deleteAddress(id, cb){
    let queryDelete = `DELETE FROM Addresses WHERE id = ${id}`;
                 
    //execute query
    db.run(queryDelete,(err)=>{
      cb(err);
    })
  }

  static addressJoin(cb){
    let showAddressesJoin = `SELECT
                             Addresses.id AS id, Addresses.id_contacts, Addresses.street, Addresses.city, Addresses.zipcode,
                             Contacts.id AS cid, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email
                            FROM Addresses 
                            JOIN Contacts 
                            ON Addresses.id_contacts = Contacts.id`;
    //bikin query address join
    db.all(showAddressesJoin, function (err, data){
      cb(data);
    })
  }

  static addressJoinId(id, cb){
    let showSpecificId = `SELECT
                             Addresses.id AS id, Addresses.id_contacts, Addresses.street, Addresses.city, Addresses.zipcode,
                             Contacts.id AS cid, Contacts.name, Contacts.company, Contacts.telp_number, Contacts.email
                            FROM Addresses 
                            JOIN Contacts 
                            ON Addresses.id_contacts = Contacts.id
                            WHERE Addresses.id=${id}`;
    db.all(showSpecificId, (err, rows)=>{
      cb(rows);
    })
  }
}

module.exports = Address;