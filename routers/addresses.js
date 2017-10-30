const express = require('express')
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

const router = express.Router()

// define the addresses page route
router.get('/', function(req, res) {
  Address.findAll((err, rows) => {
    res.render('addresses/index', {error: err, dataAddresses: rows})
  })
})

router.get('/add', function(req, res) {
  Contact.findAll((err, rows) => {
    res.render('addresses/add', {error: err, dataContacts: rows})
  })
})

router.post('/add', function(req, res) {
  Address.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', function(req, res) {
  Address.findById(req.params.id, (err1, rows1) => {
    Contact.findAll((err2, rows2) => {
      // res.send(rows2)
      res.render('addresses/edit', {errorAddress: err1, errorContacts: err2, dataAddress: rows1, dataContacts: rows2})
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
  Address.delete(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

module.exports = router
