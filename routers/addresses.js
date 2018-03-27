const express = require('express')
const router = express.Router()
const Address = require('../models/addresses.js');
const Contact = require('../models/contacts')

router.get('/addresses', (req, res) => {
  Address.findAll().then(dataAddress =>{
    Contact.findAll().then(dataContacts =>{
      res.render('addresses/addresses', {dataAddress:dataAddress, dataContacts:dataContacts})
    })
  }).catch(err =>{
    console.log(err);
  })
})

router.post('/addresses', (req, res) => {
  Address.create(req).then(dataAddress => {
    res.redirect('/addresses')
  }).catch(err => {
    console.log(err);
  })
})

router.get('/addresses/edit/:id', (req, res) => {
  Address.findById(req).then(dataAddress => {
    Contact.findAll().then(dataContacts =>{
      res.render('addresses/edit', {dataAddress:dataAddress, dataContacts:dataContacts})
    })
  }).catch(err =>{
    console.log(err);
  })
})

router.post('/addresses/edit/:id', (req, res) => {
  Address.update(req).then(dataAddress => {
    res.redirect('/addresses')
  }).catch(err =>{
    console.log(err);
  })
})

router.get('/addresses/delete/:id', (req, res) => {

  Address.destroy(req).then(()=> {
    res.redirect('/addresses')
  }).catch(err =>{
    console.log(err);
  })
})


//rilis 8

router.get('/contacts/addresses_with_contact/:id', (req, res) =>{
  Address.address_with_contact(req).then(data =>{
    Address.findAll().then(dataAddresses =>{
      res.render('addresses/address_with_contact', {data:data, dataAddresses:dataAddresses})
    }).catch(err =>{
      console.log(err);
    })
  })
})


module.exports = router;
