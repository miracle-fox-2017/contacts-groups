const express = require('express')
const router = express.Router()
const Address = require('../models/addresses.js');
const Contact = require('../models/contacts')

router.get('/addresses', (req, res) => {
  Address.findAll(dataAddress =>{
    Contact.findAll(dataContacts =>{
    res.render('addresses/addresses', {dataAddress:dataAddress, dataContacts:dataContacts})
    })
  })
})

router.post('/addresses', (req, res) => {
  Address.create(req, dataAddress => {
    res.redirect('/addresses')
  })
})

router.get('/addresses/edit/:id', (req, res) => {
  Address.findById(req, dataAddress => {
    Contact.findAll(dataContacts =>{
      res.render('addresses/edit', {dataAddress:dataAddress, dataContacts:dataContacts})
    })
  })
})

router.post('/addresses/edit/:id', (req, res) => {
  Address.update(req, dataAddress => {
  //res.send('hello')
    res.redirect('/addresses')
  })
})

router.get('/addresses/delete/:id', (req, res) => {
  Address.destroy(req, dataAddress => {
    res.redirect('/addresses')
  })
})


//rilis 8
router.get('/contacts/addresses_with_contact/:id', (req, res) =>{
  Contact.findById(req,dataContact =>{
    Address.findAll(dataAddresses=>{
      let data = []
      dataAddresses.forEach(function (item){
        if(dataContact.id == item.ContactId ){
            data.push(item)
          }
      })
      res.render('addresses/address_with_contact',{data:data, dataAddresses:dataAddresses})
    })
  })
})

module.exports = router;
