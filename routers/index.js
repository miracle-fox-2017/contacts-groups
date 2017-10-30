const express = require('express')
const router = express.Router()
const Address = require('../models/addresses');
const Contact = require('../models/contacts');

router.get('/', (req, res) => {
  res.render('index', {title:'Home'})
})

router.get('/addresses_with_contact', (req,res) => {
  Address.getAll((err, addressesData) => {
    Contact.getAll((err, contactsData) => {
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
