const sqlite3    = require('sqlite3').verbose();
const db  = new sqlite3.Database('./db/database.db');

class Address {
  constructor(){}
  
  static showAddress(cb){
    let q = `SELECT * FROM Addresses`;
    db.all(q, function(err, rows){
      if(!err){
        cb(rows);
      } else {
        console.log(err);
      }
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
      if(!err){
        cb(this);
      } else {
        console.log(err);
      }
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
      if(!err){
        cb();
      } else {
        console.log(err);
      }
    })
  }

  static deleteAddress(id, cb){
    let queryDelete = `DELETE FROM Addresses WHERE id = ${id}`;
                 
    //execute query
    db.run(queryDelete,(err)=>{
      if(!err){
        cb();
      } else {
        console.log(err);
      }
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
      if(!err){
        cb(data);
      } else {
        console.log(err);
      }
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
      if(!err){
        cb(rows);
      } else {
        console.log(err);
      }
    })
  }
  
  static addresses_with_contact(contact, cb){
    this.showAddress(function(address){
      let result = [];
      for(let i = 0; i<address.length; i++){
        for(let j = 0; j<contact.length; j++){
          if(address[i].id_contacts == contact[j].id){
            result.push(new AddressWithContact(
              address[i].id,
              address[i].street,
              address[i].city,
              address[i].zipcode,
              contact[j].name,
              contact[j].company,
              contact[j].zipcode,
              contact[j].email,
              contact[j].id
            ))
          }
        }
      }
      // console.log(result);
      cb(result, contact)
    })
  }
  
}

class AddressWithContact {
  constructor(id, street, city, zipcode, name, company, telp_number, email, cid){
    this.id = id;
    this.street = street;
    this.city = city;
    this.zipcode = zipcode;
    this.name = name;
    this.telp_number = telp_number;
    this.email = email;
    this.cid = cid;
  }
}

module.exports = Address;