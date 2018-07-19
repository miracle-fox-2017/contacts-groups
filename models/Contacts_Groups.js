const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');
const Contact = require('./contacts');
const Group = require('./groups');
//ContactId, GroupsId
class ContactsGroups {

  static findContacts_Groups(){
    return new Promise((resolve, reject) =>  {
      Promise.all(
        [
          Contact.findAll(),
          this.findAll(),
          Group.findAll()
        ])
          .then(allData=>{
            // console.log(allData);
            allData[0].map(contact =>{
              // console.log(contact);
              contact.getIdgroup = []
              allData[1].map(contacts_groups =>{
                if(contact.id === contacts_groups.ContactsId){
                  contact.getIdgroup.push(contacts_groups.GroupsId)
                }
              })
              contact.name_of_groups = []
              contact.getIdgroup.map(id =>{
                allData[2].map(group =>{
                  if(id === group.id){
                    contact.name_of_groups.push(' '+group.name_of_group)
                  }
                })
              })
            })
            // console.log(allData[0]);
            resolve(allData[0]);
          })
            .catch(err=>{
              reject(err)
            })
    });
  }

  static findGroups_Contacts(){
    return new Promise((resolve, reject)=> {
      Promise.all(
        [
            Group.findAll(),
            this.findAll(),
            Contact.findAll()
        ])
          .then(allData =>{
            allData[0].map(group =>{
              group.id_contact = []
              allData[1].map(groups_contacts =>{
                if(group.id === groups_contacts.GroupsId){
                  group.id_contact.push(groups_contacts.ContactsId)
                }
              })
              group.name = []
              group.id_contact.map(id =>{
                allData[2].map(contact =>{
                  if(id === contact.id){
                    group.name.push(' '+contact.name)
                  }
                })
              })
            })
            resolve(allData[0])
          })
            .catch(err=>{
              reject(err)
            })
    });
  }
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Contacts_Groups`
      db.all(query, (err, dataCon)=>{

        if(!err){
          resolve(dataCon)
        } else {
          reject(err)
        }
      })
    });
  }
  static create(idContact, idGroup){
    return new Promise(function(resolve, reject) {
      let query = `INSERT INTO Contacts_Groups (ContactsId, GroupsId) VALUES ('${idContact}', ${idGroup})`
      db.run(query, (err)=>{
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
module.exports = ContactsGroups;
