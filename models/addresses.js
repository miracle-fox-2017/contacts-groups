const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');


class Addresses{
  static findAll(cb){
    let query = `SELECT * FROM Addresses`;
    db.all(query,function(err,addressesRows){
      if(!err){
        cb(null,addressesRows)
      }else{
        console.log(err)
      }
    })
  }

  static create(obj,cb){
    let query = `INSERT INTO Addresses (street,city,zipcode)
                 VALUES("${obj.street}", "${obj.city}", "${obj.zipcode}")`;
    db.all(query,function(err,addressesRows){
      if(!err){
        cb(null,addressesRows)
      }else{
        console.log(err)
      }
    })
  }

  static delete(id){
    let query = `DELETE FROM Addresses
                 WHERE id = ${id}`;
    db.all(query)
  }

  static findById(id,cb){
    let query = `SELECT * FROM Addresses where id = "${id}"`;
    db.all(query,function(err,addressesRows){
      if(!err){
        cb(null,addressesRows)
      }else{
        console.log(err)
      }
    })
  }

  static update(obj){
    let query = `UPDATE Addresses
               SET street = "${obj.street}",
               city = "${obj.city}",
               zipcode = "${obj.zipcode}"
               WHERE id = "${obj.id}"`;
   db.all(query)
  }
}

module.exports = Addresses
