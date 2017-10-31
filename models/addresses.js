const sqlite3    = require('sqlite3').verbose()
const db         = new sqlite3.Database('data/database.db')

class Addresses{

  static findAll(){
    return new Promise(function(resolve,reject){
      let joinQuery = 'select Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Contacts.name from Addresses LEFT JOIN Contacts ON Addresses.contact_id = Contacts.id'
      db.all(joinQuery, function(err,data_Join){
        if(!err){
          resolve(data_Join)
        }else{
          reject(err)
        }
      })
    })
  }

  static findAll_no_join(cb){
    return new Promise(function(resolve,reject){
      db.all(`select * from Addresses`, function(err, data_Addresses){
        if(!err){
          resolve(data_Addresses)
        }else{
          reject(err)
        }
      })
    })
  }

  static create(reqbody){
    return new Promise(function(resolve, reject) {
      db.run(`insert into Addresses(street,city,zipcode,contact_id) values ('${reqbody.street}','${reqbody.city}','${reqbody.zipcode}','${reqbody.name}')`, function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

  static findById(reqparams){
    return new Promise(function(resolve,reject){
      db.all(`select * from Addresses where id="${reqparams.id}"`, function(err,data_Addresses){
        if(!err){
          resolve(data_Addresses[0])
        }else{
          reject(err)
        }
      })
    })
  }

  static update(reqbody,reqparams){
    return new Promise(function(resolve,reject){
      db.run(`update Addresses set street="${reqbody.street}", city="${reqbody.city}", zipcode="${reqbody.zipcode}", contact_id="${reqbody.name}" where id="${reqparams.id}"`, function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

  static reMove(reqparams){
    return new Promise(function(resolve,reject){
      db.run(`delete from Addresses where id='${reqparams.id}'`,function(err){
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    })
  }

}

module.exports = Addresses
