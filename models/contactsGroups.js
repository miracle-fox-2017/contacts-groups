const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
const Contact = require('./contacts');
const Group = require('./groups');

class ContactGroup {
  static getAll() {
    return new Promise(function(resolve, reject) {
      db.all('SELECT * FROM ContactsGroups', (err, rows)=>{
        if(!err){
          resolve(rows)
        }else {
          reject(err)
        }
      })
    });
  }

  static create(contact_id,group_id) {
    return new Promise(function(resolve, reject) {
      db.run(`INSERT INTO ContactsGroups (contact_id,group_id) VALUES ('${contact_id}','${group_id}')`,err => {
        if(!err){
          resolve()
        }else{
          reject(err)
        }
      })
    });
  }

  static destroy(id) {
    db.run(`DELETE FROM ContactsGroups WHERE id='${id}'`)
  }

  static contactGroupsAll() {
    return new Promise(function(resolve, reject) {
      Promise.all([
        Contact.getAll(),
        ContactGroup.getAll(),
        Group.getAll()
      ]).then(rows => {
        rows[0].forEach(contact => {
          contact.name_of_group = []
          rows[1].forEach(cG => {
            rows[2].forEach(group => {
              if(cG.contact_id == contact.id && cG.group_id == group.id){
                contact.name_of_group.push(group.name_of_group)
              }
            })
          })
        })
        resolve(rows[0]);
      }).catch(err => {
        reject(err)
      })
    });
  }

  static groupContactsAll() {
    return new Promise(function(resolve, reject) {
      Promise.all([
        Group.getAll(),
        ContactGroup.getAll(),
        Contact.getAll()
      ]).then(rows => {
        rows[0].forEach(group => {
          group.members = []
          rows[1].forEach(cG => {
            rows[2].forEach(contact => {
              if(cG.contact_id == contact.id && cG.group_id == group.id){
                group.members.push(contact.name)
              }
            })
          })
        })
        resolve(rows[0]);
      }).catch(err => {
        reject(err)
      })
    });
  }
}

module.exports = ContactGroup;
