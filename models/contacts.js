const sqlite3 = require('sqlite3').verbose();
const ContactGroup = require('../models/contactsGroups')

const db = new sqlite3.Database('database/data.db');

class Contact {
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Contacts`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO Contacts (name, company, telp_number, email) VALUES (
        '${data.name}', '${data.company}', '${data.telp_number}', '${data.email}')`, function(err) {
        if(err) {
          reject(err)
        } else {
          resolve(this.lastID)
        }
      })
    })
  }

  static findById(contactId) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Contacts WHERE id = ${contactId}`, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static update(data, contactId) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE Contacts SET name = '${data.name}', company = '${data.company}',
      telp_number = '${data.telp_number}', email = '${data.email}' WHERE id = ${contactId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static remove(contactId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Contacts WHERE id = ${contactId}`, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static contactWithGroup() {
    return new Promise((resolve, reject) => {
      Promise.all([
        Contact.findAll(),
        ContactGroup.findWithGroups()
      ]).then((allData) => {
        let dataContacts = allData[0]
        let dataContactGroups = allData[1]
        dataContacts.forEach((dataContact) => {
          dataContact.name_of_group = []
          dataContactGroups.forEach((dataContactGroup) => {
            if(dataContact.id == dataContactGroup.contactId) {
              dataContact.name_of_group.push(dataContactGroup.name_of_group)
            }
          })
        })
        resolve(dataContacts)
      })
    })
  }
}

module.exports = Contact;
