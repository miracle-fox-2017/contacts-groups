var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/database.db');
const Contact = require('../models/contacts')


class Address {


  static findAll(){
    return new Promise ((resolve,reject) =>{
      db.all(`SELECT Addresses.*, Contacts.name, Contacts.id as
        ContactId FROM Addresses LEFT JOIN Contacts ON Contacts.id = Addresses.ContactId`, (err, rows) => {
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })

  }

  static create(req){
    return new Promise ((resolve, reject) =>{
      db.run(`INSERT INTO Addresses (street, city, zipcode, ContactId)
      VALUES ('${req.body.street}','${req.body.city}', ${req.body.zipcode}, ${req.body.ContactId})`, (err, rows) => {
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }

  static findById(req){
    return new Promise((resolve, reject) =>{
      db.each(`SELECT * FROM Addresses WHERE ID = ${req.params.id}`, (err, rows) => {
        if(err){
          reject(err);
        }else{
          resolve(rows)
        }
      })
    })
  }



  static update(req, callback){
    return new Promise ((resolve, reject) =>{
      db.run(`UPDATE Addresses SET
        city = '${req.body.city}',
        street = '${req.body.street}',
        zipcode = ${req.body.zipcode},
        ContactId = '${req.body.ContactId}'
        WHERE ID = ${req.params.id}`, (err, rows)=>{
          if(err){
            reject(err);
          }else{
            resolve(rows)
          }
      })
    })
  }

  static destroy(req){
    return new Promise ((resolve, reject) =>{
      db.run(`DELETE FROM Addresses WHERE ID = ${req.params.id}`, (err,rows) => {
        if(!err){
          resolve()
        }
      })
    })
  }

  static address_with_contact(req){
    return new Promise((resolve, reject) =>{
      Promise.all([
        Contact.findById(req),
        this.findAll(),
      ]).then(data =>{
        let arrAddress = []
        data[1].forEach(item =>{

          if(item.ContactId == data[0].id){
            arrAddress.push(item)
          }
        })
        resolve(arrAddress)
      })
    })
  }
}



module.exports = Address;
