const express = require('express')
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

const router = express.Router()

// define the profiles page route
router.get('/', function(req, res) {
  Profile.findWithContacts().then((rowProfileWithContacts) => {
    res.render('profiles/index', {title: 'My Contacts App | Profiles Page', dataProfiles: rowProfileWithContacts})
  })
})

router.get('/add', function(req, res) {
  Contact.findAll().then((rowContacts) => {
    res.render('profiles/add', {title: 'My Contacts App | Add Profile', error: false, dataContacts: rowContacts})
  })
})

router.post('/add', function(req, res) {
  Contact.findAll().then((rowContacts) => {
    Profile.create(req.body).then(() => {
      res.redirect('/profiles')
    }).catch((error) => {
      res.render('profiles/add', {title: 'My Contacts App | Add Profile', error: true, dataContacts: rowContacts})
    })
  })
})

router.get('/edit/:id', function(req, res) {
  Profile.findById(req.params.id).then((rowProfile) => {
    Contact.findAll().then((rowContacts) => {
      res.render('profiles/edit', {title: 'My Contacts App | Edit Profile', dataProfile: rowProfile, dataContacts: rowContacts})
    })
  })
})

router.post('/edit/:id', function(req, res) {
  Profile.update(req.body, req.params.id).then(() => {
    res.redirect('/profiles')
  })
})

router.get('/delete/:id', function(req, res) {
  Profile.remove(req.params.id).then(() => {
    res.redirect('/profiles')
  })
})

module.exports = router
