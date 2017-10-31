const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Address = require('./addresses')

class Contact {
  static testing(){
    return "aloha"
  }
  static getAll() {
    return new Promise(function(resolve, reject) {
      db.all('SELECT * FROM Contacts', (err, rows) => {
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    });
  }

  static create(input) {
    return new Promise(function(resolve, reject) {
      if(!input.name){
        reject('Please fill out all required fields!!')
      }else{
        db.run(`INSERT INTO Contacts (name,company,telp_number,email) VALUES ('${input.name}','${input.company}','${input.telp_number}','${input.email}')`,function (err){
          if(!err){
            resolve(this.lastID)
          }else{
            reject(err)
          }
        })
      }
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db.get(`SELECT * FROM Contacts WHERE id='${id}'`, (err, rows)=>{
        if(!err){
          resolve(rows)
        }else{
          reject(err)
        }
      })
    });
  }

  static update(input, id) {
    return new Promise(function(resolve, reject) {
      db.run(`UPDATE Contacts SET name='${input.name}', company='${input.company}', telp_number='${input.telp_number}', email='${input.email}' WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }

  static destroy(id) {
    return new Promise(function(resolve, reject) {
      db.run(`DELETE FROM Contacts WHERE id='${id}'`, err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }

  static contactAddresses(id) {
    return new Promise(function(resolve, reject) {
      Promise.all([
        Contact.getOne(id),
        Address.getAll()
      ]).then(rows => {
        rows[0].addresses = []
        rows[1].forEach(address => {
          if(rows[0].id == address.contact_id){
            rows[0].addresses.push(address)
          }
        })
        resolve(rows[0]);
      })
    });
  }

  static addressWithContact() {
    return new Promise(function(resolve, reject) {
      Promise.all([
        Address.getAll(),
        Contact.getAll()
      ]).then(rows => {
        rows[0].forEach(address => {
          rows[1].forEach(contact => {
            if(address.contact_id == contact.id){
              address.name = contact.name
              address.company = contact.company
            }
          })
        })
        resolve(rows[0]);
      }).catch(err => {
        reject(err)
      })
    });
  }
}

module.exports = Contact;
