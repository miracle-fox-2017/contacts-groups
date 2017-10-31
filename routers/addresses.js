const express = require('express')
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

const router = express.Router()

// define the addresses page route
router.get('/', function(req, res) {
  Address.findWithContact((err, rows) => {
    res.render('addresses/index', {title: 'My Contacts App | Addresses Page', dataAddresses: rows})
  })
})

router.get('/add', function(req, res) {
  Contact.findAll((err, rows) => {
    res.render('addresses/add', {title: 'My Contacts App | Add Address', dataContacts: rows})
  })
})

router.post('/add', function(req, res) {
  Address.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', function(req, res) {
  Address.findById(req.params.id, (errAddress, rowsAddress) => {
    Contact.findAll((errContacts, rowsContacts) => {
      res.render('addresses/edit', {title: 'My Contacts App | Edit Address', dataAddress: rowsAddress, dataContacts: rowsContacts})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  Address.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

router.get('/delete/:id', function(req, res) {
  Address.remove(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

module.exports = router
