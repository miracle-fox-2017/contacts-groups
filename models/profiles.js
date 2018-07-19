const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');
const Contact = require('./contacts');
//username, password
class Profile {
  static findAllProfileContacts(){
    return new Promise((resolve, reject)=> {
      let hasil = []
      this.findAll()
        .then(dataProfiles=>{
          dataProfiles.forEach((profile, index)=>{
              Contact.getById(profile.ContactsId)
                .then(dataContact=>{
                  if(profile.ContactsId){
                  profile.name = dataContact.name
                  hasil.push(profile)
                  }
                  if(dataProfiles.length - 1 == index){
                    resolve(hasil)
                  }
                })
          })
        })
          .catch(err=>{
            reject(err)
          })
    });
  }
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Profile`
      db.all(query, (err, rowProfiles)=>{
        if(!err){
          resolve(rowProfiles)
        } else {
          reject(err)
        }
      })
    });
  }
  static getById(id){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Profile WHERE id = '${id}'`
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
      let query = `UPDATE Profile SET username = '${data.username}', password = '${data.password}', ContactsId = '${data.ContactsId}' WHERE id = '${id}'`
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
      let query = `INSERT INTO Profile (username, password, ContactsId) VALUES ('${data.username}', '${data.password}','${data.ContactsId}')`
      db.run(query, (err)=>{
        if(!err){
          resolve()
        } else {
          reject(err)
        }
      })
    });
  }
  static remove(id){
    new Promise(function(resolve, reject) {
      let query = `DELETE FROM Profile WHERE id = '${id}'`
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
module.exports = Profile;
