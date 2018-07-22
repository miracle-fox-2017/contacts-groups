const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const Contact = require('./contacts')
const Group = require('./groups')

class ContactGroup {

  static findAllwithContact(groups) {
    // db.all(`SELECT ContactsGroups.ContactId, Contacts.name, ContactsGroups.GroupId FROM ContactsGroups LEFT JOIN Contacts ON ContactsGroups.ContactId = Contacts.id`, (err, contact) => {
    //
    //   contact = contact.filter((elemen) => {
    //     if(elemen.name == null) {
    //       return false
    //     }
    //     else {
    //       return true
    //     }
    //   })
    //   console.log(contact);
    //
    //   for(var i = 0; i < groups.length; i++) {
    //     var tampung = []
    //     contact.forEach((elemen) => {
    //       if(groups[i].id == elemen.GroupId) {
    //         tampung.push(elemen.name)
    //       }
    //     })
    //     groups[i].groups = [...new Set(tampung)].join(',')
    //   }
    //
    //   callback(groups)
    //
    // })

    return new Promise((resolve, reject) => {
      db.all(`SELECT ContactsGroups.ContactId, Contacts.name, ContactsGroups.GroupId FROM ContactsGroups LEFT JOIN Contacts ON ContactsGroups.ContactId = Contacts.id`, (err, contact) => {
        if(!err) {
          contact = contact.filter((elemen) => {
            if(elemen.name == null) {
              return false
            }
            else {
              return true
            }
          })
          console.log(contact);

          for(var i = 0; i < groups.length; i++) {
            var tampung = []
            contact.forEach((elemen) => {
              if(groups[i].id == elemen.GroupId) {
                tampung.push(elemen.name)
              }
            })
            groups[i].groups = [...new Set(tampung)].join(',')
          }
          resolve(groups)
        }
        else {
          reject(err)
        }
      })
    })

  }

  static findAllwithGroup(contacts) {
    // db.all(`SELECT Groups.name_of_group, ContactsGroups.ContactId, ContactsGroups.GroupId FROM ContactsGroups LEFT JOIN Groups ON ContactsGroups.GroupId = Groups.id`, (err, groups) => {
    //   for(var i = 0; i < contacts.length; i++) {
    //     var tampung = []
    //     groups.forEach((elemen) => {
    //       if(contacts[i].id == elemen.ContactId) {
    //         tampung.push(elemen.name_of_group)
    //       }
    //     })
    //     contacts[i].group = [... new Set(tampung)].join(',')
    //   }
    //   callback(err, contacts)
    // })
    return new Promise((resolve, reject) => {
      db.all(`SELECT Groups.name_of_group, ContactsGroups.ContactId, ContactsGroups.GroupId FROM ContactsGroups LEFT JOIN Groups ON ContactsGroups.GroupId = Groups.id`, (err, groups) => {
        if(!err) {
          for(var i = 0; i < contacts.length; i++) {
            var tampung = []
            groups.forEach((elemen) => {
              if(contacts[i].id == elemen.ContactId) {
                tampung.push(elemen.name_of_group)
              }
            })
            contacts[i].group = [... new Set(tampung)].join(',')
          }
          resolve(contacts)
        }
        else {
          reject(err)
        }
      })
    })
  }


  static findWhere(name, value) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ContactsGroups WHERE ${name} = "${value}"`, (err, contactgroup) => {
        if(!err) {
          resolve(contactgroup)
        }
        else {
          reject(err)
        }
      })
    })
  }

  static assignedContact(id, body) {
    return new Promise((resolve, reject) => {
      db.all(`INSERT INTO ContactsGroups (ContactId, GroupId) VALUES ("${body.ContactId}", "${id}")`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

  static create(lastid,body) {
    // db.all(`INSERT INTO ContactsGroups (ContactId, GroupId) VALUES ("${lastid}", "${body.groupid}")`)

    return new Promise((resolve, reject) => {
      db.all(`INSERT INTO ContactsGroups (ContactId, GroupId) VALUES ("${lastid}", "${body.groupid}")`, (err) => {
        if(!err) {
          resolve()
        }
        else {
          reject(err)
        }
      })
    })
  }

}

module.exports = ContactGroup;
