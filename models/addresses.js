const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');
const Contact = require('./contacts');
//sreet, city, zipcode
class Address {
  static findAllName(){
    return new Promise((resolve, reject)=>{
      let hasil = []
      this.findAll()
        .then(dataAddresses =>{
          dataAddresses.forEach((address, index)=>{
            Contact.getById(address.ContactsId)
              .then(dataContacts=>{
                if(address.ContactsId){
                  address.name = dataContacts.name
                  hasil.push(address)
                }

                if(index == dataAddresses.length -1){
                  resolve(hasil)
                }
              })
          })
        })
          .catch(err=>{
            console.log(err);
            reject(err)
          })
    });
    // Address.findAll((err, dataAddresses)=>{
    //   if(!err){
    //     let count = 0
    //         dataAddresses.forEach((row, index) => {
    //           // get contact by row.contact_id
    //           Contact.getById(row.ContactsId, (err, dataContact)=>{
    //             if(row.ContactsId){
    //               row.name = dataContact.name
    //             }
    //             Contact.findAll((err, dataContacts)=>{
    //               if(!err){
    //                 if(index == dataAddresses.length - 1){
    //                   res.render('addresses', {rowsAddresses:dataAddresses, dataContacts:dataContacts})
    //                 }
    //               } else {
    //                 console.log(err);
    //                 res.send(err)
    //               }
    //             })
    //           })
    //         })
    //   } else {
    //     console.log(err);
    //     res.send(err)
    //   }
    //
    // })
  }
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Addresses`
      db.all(query, (err, rowGroups)=>{
        if(!err){
          resolve(rowGroups)
        } else {
          reject(err)
        }
      })
    });
  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Addresses WHERE id = '${id}'`
      db.get(query, (err, rows)=>{
        if(!err){
          resolve(rows)
        } else {
          reject(err)
        }
      })
    });
  }
  static findWhere(){

  }
  static update(id,data){
    return new Promise(function(resolve, reject) {
      let query = `UPDATE Addresses SET street = '${data.street}', city ='${data.city}', zipcode = '${data.zipcode}', ContactsId = '${data.ContactsId}' WHERE id = '${id}'`
      db.run(query, err=>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }
  static create(data){
    return new Promise(function(resolve, reject) {
      let query = `INSERT INTO Addresses (street, city, zipcode, ContactsId) VALUES ('${data.street}','${data.city}','${data.zipcode}',${data.ContactsId})`
      db.run(query, (err)=>{
        if(err){
          reject(err)
        } else {
          resolve()
        }
      })
    });
  }
  static remove(id){
    return new Promise(function(resolve, reject) {
      let query = `DELETE FROM Addresses WHERE id = '${id}'`
      db.run(query, err =>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }

  //END
}
module.exports = Address;
