const express = require('express')
const router = express.Router();

const Address = require('../models/addresses');
const Contact = require('../models/contacts');

router.get('/', function(req, res){
  Address.findAllWithContact(function(err, rowsAddress) {
    Contact.findAll(function(err, rowsContacts){
      res.render('addresses', {dataAddress: rowsAddress, dataContact: rowsContacts})
    })
  })
})

router.post('/', function(req, res){
  Address.addAddress(req.body)
  res.redirect('./addresses')
})

router.get('/edit/:id', function(req, res){
  Address.formEditAddress(req.params.id, function(err, rowsEditAddress){
    Contact.findAll(function(err, rowsContacts){
      res.render('editAddresses', {rowsEditAddress: rowsEditAddress, dataContact: rowsContacts})
    })
  })
})

router.post('/edit/:id', function(req, res){
  Address.editAddress(req.params.id, req.body)
  res.redirect('/addresses')
})

router.get('/delete/:id', function(req, res){
  Address.hapusAddress(req.params.id)
  res.redirect('/addresses')
})

module.exports = router
