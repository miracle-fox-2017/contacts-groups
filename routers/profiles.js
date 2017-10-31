const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

const router = express.Router()
const db = new sqlite3.Database('database.db')

router.get('/', (req, res) => {
  Profile.findAllwithContact().then((profile) => {
    Contact.findAll().then((contactname) => {
      res.render('profile', {data:profile, error: '', contactname: contactname})
    })
  })
})


router.post('/', (req, res) => {
  Profile.create(req.body).then(() => {
    res.redirect('./profiles')
  }).catch((err) => {
    Profile.findAllwithContact().then((profile) => {
      Contact.findAll().then((contactname) => {
        res.render('profile', {data:profile, error: '', contactname: contactname})
      })
    })
  })
})

router.get('/delete/:id', (req, res) => {
  Profile.remove(req.params.id).then(() => {
    res.redirect('/profiles')
  })
})

router.get('/edit/:id', (req, res) => {

  Profile.findAllwithContactById(req.params.id).then((profiles) => {
    Contact.findAll().then((contactname) => {
      res.render('profileedit', {data: profiles, error: '', contactname: contactname})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Profile.update(req.params.id, req.body).then(() => {
    res.redirect('/profiles')
  })
})


module.exports = router;
