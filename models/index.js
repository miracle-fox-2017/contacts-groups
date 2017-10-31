const sqlite3 = require('sqlite3').verbose();
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

const db = new sqlite3.Database('database/data.db');

class Index {
  static addressWithContact() {
    return new Promise((resolve, reject) => {
      Promise.all([
        Address.findAll(),
        Contact.findAll()
      ]).then((allData) => {
        let dataAddresses = allData[0]
        let dataContacts = allData[1]
        dataAddresses.forEach((dataAddress) => {
          dataContacts.forEach((dataContact) => {
            if(dataAddress.contactId == dataContact.id) {
              dataAddress.name = dataContact.name
              dataAddress.company = dataContact.company
            }
          })
        })
        resolve(dataAddresses)
      })
    })
  }
}

module.exports = Index;
