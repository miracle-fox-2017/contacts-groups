const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')

class Addresses{

  static findAll(cb){
    let joinQuery = 'select Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name from Addresses LEFT JOIN Contacts ON Addresses.contact_id = Contacts.id'
    db.all(joinQuery, function(err,data_Join){
      if(!err){
        cb(null,data_Join)
      }else{
        cb(err,null)
      }
    })
  }

  static findAll_no_join(cb){
    db.all(`select * from Addresses`, function(err, data_Addresses){
      if(!err){
        cb(null,data_Addresses)
      }else{
        cb(err,null)
      }
    })
  }

  static create(reqbody,cb){
    db.run(`insert into Addresses(street,city,zipcode,contact_id) values ('${reqbody.street}','${reqbody.city}','${reqbody.zipcode}','${reqbody.name}')`, function(err){
      if(!err){
        cb('succes insert into Addresses')
      }else{
        cb(err)
      }
    })
  }

  static findById(reqparams,cb){
    db.all(`select * from Addresses where id="${reqparams.id}"`, function(err,data_Addresses){
      if(!err){
        cb(null,data_Addresses[0])
      }else{
        cb(err,null)
      }
    })
  }

  static update(reqbody,reqparams){
    db.run(`update Addresses set street="${reqbody.street}", city="${reqbody.city}", zipcode="${reqbody.zipcode}", contact_id="${reqbody.name}" where id="${reqparams.id}"`, function(err){
      if(err){
        console.log(err,'failed update in Addresses');
      }
    })
  }

  static reMove(reqparams){
    db.run(`delete from Addresses where id='${reqparams.id}'`,function(err){
      if(err){
        console.log(err);
      }
    })
  }

}

module.exports = Addresses
