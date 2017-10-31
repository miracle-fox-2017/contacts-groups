const express = require('express')
const router = express.Router()
const Address = require('../models/addresses');
const Contact = require('../models/contacts');

router.get('/', (req, res) => {
  res.render('index', {title:'Home'})
})

router.get('/addresses_with_contact', (req,res) => {
  Contact.addressWithContact().then(addressesData => {
    res.render('addresses/addresses_with_contact', {title:'Addresses Detail', addresses:addressesData})
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
