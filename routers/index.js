const express = require('express')
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.render('index', {title: 'My Contacts App'})
})

router.get('/addresses_with_contact', function(req, res) {
  Address.findAll((errAddress, rowsAddresses) => {
    Contact.findAll((errContact, rowsContacts) => {
      rowsAddresses.forEach((rowsAddress) => {
        rowsContacts.forEach((rowsContact) => {
          if(rowsContact.id == rowsAddress.contactId) {
            rowsAddress.name = rowsContact.name
            rowsAddress.company = rowsContact.company
          }
        })
      })
      // res.send(rowsAddresses)
      res.render('addresses_with_contact', {title: 'My Contacts App | Addresses With Contact', dataAddresses: rowsAddresses})
    })
  })
})

module.exports = router
