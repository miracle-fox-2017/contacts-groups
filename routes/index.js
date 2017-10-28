const express = require('express')
const router = express.Router()
const Addresses = require('../models/addresses');
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  res.render('index', {title:'Home'})
})

router.get('/addresses_with_contact', (req,res) => {
  Addresses.getAll(addressesData => {
    Contacts.getAll(contactsData => {
      addressesData.forEach(address => {
        contactsData.forEach(contact => {
          if(address.contact_id == contact.id){
            address.name = contact.name
            address.company = contact.company
          }
        })
      })
      res.render('addresses/addresses_with_contact', {title:'Addresses Detail', addresses:addressesData})
    })
  })
})

module.exports = router;
