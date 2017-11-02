const express = require('express');
const router = express.Router();

const address = require('../models/address')
const contact = require('../models/contact')

router.get('/addresses', function (req, res) {
  address.findAllWithContact(function(addressdata)
  {
    console.log(addressdata)
    contact.findAll(function(contactsdata){
      res.render('addresses', {addressdata:addressdata, contactsdata:contactsdata})
    })
    // console.log(rows);
  })
})

router.post('/addresses', function (req, res) {
  // console.log(req.body);
  address.create(req.body);
  res.redirect('/addresses');
})

router.get('/addresses/edit/:id', function (req, res) {
  // console.log(req.params);
  address.findID(req.params.id, function(addressdata){
    contact.findAll(function(contactsdata){
      res.render('addressedit', {addressdata:addressdata, contactsdata:contactsdata})
    })
  })
})

router.post('/addresses/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  address.update(req.body, req.params.id)
  res.redirect('/addresses');
})

router.get('/addresses/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  address.remove(req.params.id);
  res.redirect('/addresses');
})

router.get('/addresses_with_contact', function (req, res){
  address.findAllWithContact(function(addressdata){
    contact.findAll(function(contactsdata){
      res.render('addresses_with_contact', {addressdata:addressdata, contactsdata:contactsdata})
    })
  })
})

module.exports = router