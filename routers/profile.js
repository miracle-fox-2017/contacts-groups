const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.js');
const Contact = require('../models/contacts')

router.get('/profile', (req, res) => {
  Profile.findAll(dataProfile =>{
    Contact.findAll(dataContacts =>{
      res.render('profile/profile', {err:null,dataProfile:dataProfile, dataContacts:dataContacts})
    })
  })
})

router.post('/profile', (req, res) => {
  Profile.create(req, err => {
    if(err){
      Profile.findAll(dataProfile =>{
        Contact.findAll(dataContacts =>{
          res.render('profile/profile', { err:err,dataProfile:dataProfile, dataContacts:dataContacts})
        })
      })

    }else{
    res.redirect('/profile')
  }
  })
})

router.get('/profile/edit/:id', (req, res) => {
  Profile.findById(req, dataProfile => {
    Contact.findAll(dataContacts =>{
      res.render('profile/edit', {dataProfile:dataProfile, dataContacts:dataContacts})
    })
  })
})

router.post('/profile/edit/:id', (req, res) => {
  Profile.update(req, dataProfile => {
  //res.send('hello')
    res.redirect('/profile')
  })
})
//
router.get('/profile/delete/:id', (req, res) => {
  Profile.destroy(req, dataProfile => {
      res.redirect('/profile')

  })
})


module.exports = router;
