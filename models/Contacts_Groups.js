const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

//ContactId, GroupsId
class ContactsGroups {

  static findContacts_Groups(dataContacts,cb){
    let hasil = []
    // console.log(dataContacts);
    dataContacts.forEach(Contact=>{
      Contact.name_of_groups = []
      let query = `SELECT * FROM Contacts_Groups INNER JOIN Groups
      ON Contacts_Groups.GroupsId = Groups.id WHERE Contacts_Groups.ContactsId = ${Contact.id}`
      db.all(query, (err, dataAll)=>{
        dataAll.forEach(dataJadi=>{
          Contact.name_of_groups.push(' '+dataJadi.name_of_group)
        })
        hasil.push(Contact)
        if(hasil.length === dataContacts.length - 1){
          cb(null, hasil)
        } else {
          cb(err, null)
        }
      })
    })
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
  static create(idContact, idGroup, cb){
    let query = `INSERT INTO Contacts_Groups (ContactsId, GroupsId) VALUES ('${idContact}', ${idGroup})`
    db.run(query, (err)=>{
      if(!err){
        cb()
      } else {
        cb(err)
      }
    })
  }
  //END
}
module.exports = ContactsGroups;
