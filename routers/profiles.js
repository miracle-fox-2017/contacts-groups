const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

const router = express.Router()
const db = new sqlite3.Database('database.db')

router.get('/', (req, res) => {
  Profile.findAllwithContact((err, profiles) => {
    Contact.findAll((err, contactname) => {
      res.render('profile', {data:profiles, error: '', contactname: contactname})
    })
  })
})


router.post('/', (req, res) => {
  Profile.create(req.body, (err) => {
    if(err) {
      Profile.findAllwithContact((err, profiles) => {
        Contact.findAll((err, contactname) => {
          res.render('profile', {data: profiles, error: 'Your contact already have profile', contactname:contactname})
        })
      })
    } else {
      res.redirect('./profiles')
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Profile.remove(req.params.id)
  res.redirect('/profiles')
})

router.get('/edit/:id', (req, res) => {
  Profile.findAllwithContactById(15, (err, profiles) => {
    Contact.findAll((err, contactname) => {
      res.render('profileedit', {data: profiles, error: '', contactname: contactname})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Profile.update(req.params.id, req.body)
  res.redirect('/profiles')
})

module.exports = router;
