const express = require('express')
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

const router = express.Router()

// define the profiles page route
router.get('/', function(req, res) {
  Profile.findWithContacts((err, rows) => {
    res.render('profiles/index', {title: 'My Contacts App | Profiles Page', dataProfiles: rows})
  })
})

router.get('/add', function(req, res) {
  Contact.findAll((err, rows) => {
    res.render('profiles/add', {title: 'My Contacts App | Add Profile', error: false, dataContacts: rows})
  })
})

router.post('/add', function(req, res) {
  Contact.findAll((errContacts, rowsContacts) => {
    Profile.create(req.body, (errProfile) => {
      if(errCreate) {
        res.render('profiles/add', {title: 'My Contacts App | Add Profile', error: true, dataContacts: rowsContacts})
      } else {
        res.redirect('/profiles')
      }
    })
  })
})

router.get('/edit/:id', function(req, res) {
  Profile.findById(req.params.id, (errProfile, rowsProfile) => {
    Contact.findAll((errContacts, rowsContacts) => {
      res.render('profiles/edit', {title: 'My Contacts App | Edit Profile', dataProfile: rowsProfile, dataContacts: rowsContacts})
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
