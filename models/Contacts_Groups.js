const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');
const Contact = require('./contacts');
const Group = require('./groups');
//ContactId, GroupsId
class ContactsGroups {

  static findContacts_Groups(dataContacts){
    Promise.all(
      [
        Contact.findAll(),
        this.findAll(),
        Group.findAll()
      ])
        .then(allData=>{
          allData[0].map(contact =>{
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
          console.log(allData[0]);
        })
          .catch()
    // let hasil = []
    // // console.log(dataContacts);
    // dataContacts.forEach(Contact=>{
    //   Contact.name_of_groups = []
    //   let query = `SELECT * FROM Contacts_Groups INNER JOIN Groups
    //   ON Contacts_Groups.GroupsId = Groups.id WHERE Contacts_Groups.ContactsId = ${Contact.id}`
    //   db.all(query, (err, dataAll)=>{
    //     dataAll.forEach(dataJadi=>{
    //       Contact.name_of_groups.push(' '+dataJadi.name_of_group)
    //     })
    //     hasil.push(Contact)
    //     if(hasil.length === dataContacts.length - 1){
    //       cb(null, hasil)
    //     } else {
    //       cb(err, null)
    //     }
    //   })
    // })
  }

  static findGroups_Contacts(dataGroups, cb){
    let hasil = []
    // console.log(dataContacts);
    dataGroups.forEach(Group=>{
      Group.name = []
      let query = `SELECT * FROM Contacts_Groups INNER JOIN Contacts
      ON Contacts_Groups.ContactsId = Contacts.id WHERE Contacts_Groups.GroupsId = ${Group.id}`
      db.all(query, (err, dataAll)=>{
        dataAll.forEach(dataJadi=>{
          Group.name.push(' '+dataJadi.name)
        })
        hasil.push(Group)
        if(hasil.length === dataGroups.length - 1){
          cb(null, hasil)
        } else {
          cb(err, null)
        }
      })
    })
  }
  static findAll(){
    return new Promise(function(resolve, reject) {
      let query = `SELECT * FROM Contacts_Groups`
      db.all(query, (err)=>{
        if(!err){
          resolve()
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
