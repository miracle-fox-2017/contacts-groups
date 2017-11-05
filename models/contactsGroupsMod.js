let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Contacts = require('../models/contactsMod')
let Groups = require('../models/groupsMod')

class ContactsGroups {
  constructor(id,id_contacts,id_groups,name_of_group,name){
    this.id = id;
    this.id_contacts = id_contacts;
    this.id_groups = id_groups;
    this.name_of_group = name_of_group;
    this.name = name
  }

  static getConjungction(){
    return new Promise(function(resolve,reject){
      db.all(`SELECT * FROM contacts_groups`,function(err,rows){
        if(err){
          reject(err)
        }
        else{
          resolve(rows)
        }
      })
    })
  }

  static getContactsGroups(){;
    return new Promise(function(resolve,reject){
      let group = Groups.getGroups();
      let contact = Contacts.getContacts();
      let conjunction = ContactsGroups.getConjungction();
      Promise.all([conjunction,group,contact]).then(function(rows){
        let result = [];
        rows[0].forEach(function(conjunction){
          rows[1].forEach(function(group){
            rows[2].forEach(function(contact){
              if(conjunction.id_groups === group.id && conjunction.id_contacts === contact.id){
                let contactsGroups = new ContactsGroups(conjunction.id,conjunction.id_contacts,conjunction.id_groups,group.name_of_group,contact.name)
                result.push(contactsGroups)
              }
            })
          })
        })
        resolve(result)
      })
    })
  }

  static getPost(req,contactId){
    return new Promise(function(resolve,reject){
      db.run(`INSERT INTO contacts_groups (id_contacts,id_groups) VALUES('${contactId}','${req.body.id_groups}')`,function(err){
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

module.exports = ContactsGroups;
