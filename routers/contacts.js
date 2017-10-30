const express = require('express')
const Contact = require('../models/contacts')
const Address = require('../models/addresses')
const ContactGroup = require('../models/contactsGroups')

const router = express.Router()

// define the contacts page route
router.get('/', function(req, res) {
  Contact.findAll((err1, rows1) => {
    Address.findAll((err2, rows2) => {
      ContactGroup.findAll((err3, rows3) => {
        // res.send(rows3)
        res.render('contacts/index',{error: err1, dataContacts: rows1})
      })
    })
  })
})

router.get('/add', function(req, res) {
  res.render('contacts/add', {error: false})
})

router.post('/add', function(req, res) {
  Contact.create(req.body, (err) => {
    if(req.body.name == '') {
      res.render('contacts/add', {error: true})
    } else {
      res.redirect('/contacts')
    }
  })
})

router.get('/edit/:id', function(req, res) {
  Contact.findById(req.params.id, (err, rows) => {
    res.render('contacts/edit', {error: err, dataContact: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  Contact.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/contacts')
  })
})

router.get('/delete/:id', function(req, res) {
  Contact.remove(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/contacts')
  })
})

router.get('/addresses_with_contact', function(req, res) {
  Address.findAll((err1, rows1) => {
    Contact.findAll((err2, rows2) => {
      // res.send(rows1)
      res.render('contacts/addresses_with_contact', {errorAddress: err1, errorContacts: err2, dataAddresses: rows1, dataContacts: rows2})
    })
  })
})

module.exports = router
