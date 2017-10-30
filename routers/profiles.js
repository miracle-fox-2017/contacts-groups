const express = require('express')
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

const router = express.Router()

// define the profiles page route
router.get('/', function(req, res) {
  Profile.findWithContacts((err, rows) => {
    res.render('profiles/index', {error: err, dataProfiles: rows})
  })
})

router.get('/add', function(req, res) {
  Contact.findAll((err, rows) => {
    res.render('profiles/add', {error: false, dataContacts: rows})
  })
})

router.post('/add', function(req, res) {
  Contact.findAll((errFindAll, rows) => {
    Profile.create(req.body, (errCreate) => {
      if(errCreate) {
        res.render('profiles/add', {error: true, dataContacts: rows})
      } else {
        res.redirect('/profiles')
      }
    })
  })
})

router.get('/edit/:id', function(req, res) {
  Profile.findById(req.params.id, (err1, rows1) => {
    Contact.findAll((err2, rows2) => {
      res.render('profiles/edit', {errorProfile: err1, errorContacts: err2, dataProfile: rows1, dataContacts: rows2})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  Profile.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/profiles')
  })
})

router.get('/delete/:id', function(req, res) {
  Profile.remove(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/profiles')
  })
})

module.exports = router
