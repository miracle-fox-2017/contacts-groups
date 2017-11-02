const express = require('express');
const router = express.Router();

const profile = require('../models/profile')
const contact = require('../models/contact')

// router.get('/profiles', function (req, res) {
//   Profile.findAll(function(rows)
//   {
//     // console.log(rows);
//     res.render('profiles', {rows})
//   })
// })

// router.get('/contacts', function (req, res) {
//   Contact.findAll(function(rows){
//       res.render('contacts', {rows})
//   })
// })

router.get('/profiles', function (req, res) {
  profile.findAllWithContact(function(profilesdata)
  {
    contact.findAll(function(contactsdata){
      // console.log(row);
        res.render('profiles', {profilesdata:profilesdata ,contactsdata:contactsdata, dataerror: null})
    })
    // console.log(rows);
    // res.render('profiles', {rows})
  })
})

router.post('/profiles', function (req, res) {
  profile.findByContactID(req.body.contactsid, function(dataProfile, err){
    // console.log(dataProfile);
    if(dataProfile.length > 0){
      profile.findAllWithContact(function(profilesdata)
      {
        contact.findAll(function(contactsdata){
          // console.log(row);
            res.render('profiles', {profilesdata: profilesdata, contactsdata: contactsdata, dataerror: "Your contact already have profile"})
        })
        // console.log(rows);
        // res.render('profiles', {rows})
      })
      
    } else {
      profile.create(req.body);
      res.redirect('/profiles');
    }
  })
  // // console.log(req.body);
  // Profile.create(req.body);
  // res.redirect('/profiles');
})

router.get('/profiles/edit/:id', function (req, res) {
  // console.log(req.params);
  profile.findID(req.params.id, function(profilesdata){
    contact.findAll(function(contactsdata){
        res.render('profileedit', {profilesdata, contactsdata})
    })
  })
})

router.post('/profiles/edit/:id', function (req, res){
  // console.log(req.body);
  profile.update(req.body,req.params.id)
  res.redirect('/profiles');
})

router.get('/profiles/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  profile.remove(req.params.id);
  res.redirect('/profiles');
})

module.exports = router