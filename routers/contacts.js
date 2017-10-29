const express = require('express')
const Contact = require('../models/contacts')

const router = express.Router()

// define the home page route
router.get('/', function(req, res) {
  Contact.findAll((err, rows) => {
    res.render('contacts/index',{error: err, dataContacts: rows})
  })
})

router.get('/add', function(req, res) {
  res.render('contacts/add')
})

router.post('/add', function(req, res) {
  Contact.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/contacts')
  })
})

router.get('/edit/:id', function(req, res) {
  Contact.findByID(req.params.id, (err, rows) => {
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
  Contact.delete(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/contacts')
  })
})

module.exports = router
