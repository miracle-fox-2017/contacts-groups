let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Contacts = require('../models/contactsMod')

class Addresses {
  constructor(id,street,city,zipcode,contact_id){
    this.id = id;
    this.street = street;
    this.city = city;
    this.zipcode = zipcode;
    this.contact_id = contact_id
  }

  static getAddress(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM addresses`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static getPost(req){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO addresses (street,city,zipcode,contact_id) VALUES('${req.body.street}','${req.body.city}','${req.body.zipcode}','${req.body.contact_id}')`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static getEdit(req){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`,function(err,rows){
    		if(err){
          reject(err)
    		}
    		else {
          db.all(`SELECT addresses.id, addresses.street, addresses.city, addresses.zipcode, addresses.contact_id, contacts.name FROM addresses LEFT JOIN contacts ON addresses.contact_id = contacts.id`,function(err,rows1){
            if(err){
              reject(err)
            }
            else{
              resolve([rows,rows1])
            }
          })
    		}
      })
    })
  }

  static updateAddress(req){
    return new Promise(function(resolve,reject){
      db.run(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', contact_id = '${req.body.contact_id}' WHERE id = ${req.params.id}`,function(err){
        if(err){
          reject(err)
        }
        else{
          resolve()
        }
      })
    })
  }

  static deleteAddress(req){
    return new Promise(function(resolve,reject){
      db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`,function(err){
    		if(err){
          reject(err)
    		}
        else{
          resolve()
        }
    	})
    })
  }

}

module.exports = Addresses;
