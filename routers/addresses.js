const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const Addresses = require('../models/addresses')
const Contacts = require('../models/contacts');

const router = express.Router()
const db = new sqlite3.Database('database.db')

router.get('/', (req, res) => {
  Addresses.findAllwithContact((err, addresses) => {
    Contacts.findAll((err, contact) => {
      res.render('addresses', {data: addresses, contact: contact})
    })
  })
})

router.post('/', (req, res) => {
  Addresses.create(req.body, (err) => {
    res.redirect('/addresses')
  })
})


router.get('/delete/:id', (req, res) => {
  Addresses.remove(req.params.id)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res) => {
  Addresses.findAllwithContactById(req.params.id, (err, addresses) => {
    Contacts.findAll((err, contact) => {
      res.render('addressesedit', {data: addresses, contact: contact})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Addresses.update(req.params.id, req.body)
  res.redirect('/addresses')
})

module.exports = router
