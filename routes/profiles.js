const express = require('express')
const router = express.Router();

const Profile = require('../models/profiles');
const Contact = require('../models/contacts');



router.get('/', function(req, res){
  Profile.findAllWithContact(function(err, rowsProfiles) {
    Contact.findAll(function(err, rowsContacts){
      res.render('profiles', {dataProfile: rowsProfiles, dataContact: rowsContacts})
    })
  })
})

router.post('/', function(req, res){
  Profile.addProfiles(req.body, function(err){
    if(err){
      res.send('Your contact already have profile')
    }
    else{
      res.redirect('/profiles')
    }
  })
})

router.get('/edit/:id', function(req, res){
   Profile.formEditProfiles(req.params.id, function(err, rowsEditProfiles){
    Contact.findAll(function(err, rowsContacts){
    res.render('editProfiles', {dataProfile : rowsEditProfiles, dataContact : rowsContacts})
    })
  })
})

router.post('/edit/:id', function(req, res){
  Profile.editProfiles(req.params.id, req.body)
  res.redirect('/profiles')
})

router.get('/delete/:id', function(req, res){
  Profile.deleteProfiles(req.params.id)
  res.redirect('/profiles')
})

module.exports = router
