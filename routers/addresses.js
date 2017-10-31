const express = require('express')
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

const router = express.Router()

// define the addresses page route
router.get('/', function(req, res) {
  Address.findWithContact().then((rowAddressWithContacts) => {
    res.render('addresses/index', {title: 'My Contacts App | Addresses Page', dataAddresses: rowAddressWithContacts})
  })
})

router.get('/add', function(req, res) {
  Contact.findAll().then((rowContacts) => {
    res.render('addresses/add', {title: 'My Contacts App | Add Address', dataContacts: rowContacts})
  })
})

router.post('/add', function(req, res) {
  Address.create(req.body).then(() => {
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', function(req, res) {
  Address.findById(req.params.id).then((rowAddress) => {
    Contact.findAll().then((rowContacts) => {
      res.render('addresses/edit', {title: 'My Contacts App | Edit Address', dataAddress: rowAddress, dataContacts: rowContacts})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  Address.update(req.body, req.params.id).then(() => {
    res.redirect('/addresses')
  })
})

router.get('/delete/:id', function(req, res) {
  Address.remove(req.params.id).then(() => {
    res.redirect('/addresses')
  })
})

module.exports = router
