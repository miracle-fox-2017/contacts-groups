const express = require('express')
const router = express.Router()
const Addresses = require('../models/addresses')
const Contacts = require('../models/contacts')

router.get('/', (req, res) => {
  Addresses.getAll(addressesData => {
    res.render('addresses', {title:'Addresses', addresses:addressesData})
  })
})

router.get('/add', (req, res) => {
  Contacts.getAll(contactsData => {
    res.render('addresses/add', {title:'Add Address', contacts:contactsData})
  })
})

router.post('/add', (req, res) => {
  Addresses.create(req.body)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res) => {
  Addresses.getOne(req.params.id, address => {
    Contacts.getAll(contactsData => {
      res.render('addresses/edit', {title:'Edit Address', address:address, contacts:contactsData});
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Addresses.update(req.body, req.params.id)
  res.redirect('/addresses')
})

router.get('/delete/:id', (req, res) => {
  Addresses.destroy(req.params.id)
  res.redirect('/addresses')
})

router.get('/addresses_with_contact', (req, res) => {
  Addresses.destroy(req.params.id)
  res.redirect('/addresses')
})

module.exports = router;
