const express = require('express');
const router = express.Router();

const Profile = require('../models/profile')
const Contact = require('../models/contact')

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
  Profile.findAllWithContact(function(profilesdata)
  {
    Contact.findAll(function(contactsdata){
      // console.log(row);
        res.render('profiles', {profilesdata,contactsdata})
    })
    // console.log(rows);
    // res.render('profiles', {rows})
  })
})

router.post('/profiles', function (req, res) {
  // console.log(req.body);
  Profile.create(req.body);
  res.redirect('/profiles');
})

router.get('/profiles/edit/:id', function (req, res) {
  // console.log(req.params);
  Profile.findID(req.params.id, function(profilesdata){
    Contact.findAll(function(contactsdata){
        res.render('profileedit', {profilesdata, contactsdata})
    })
  })
})

router.post('/profiles/edit/:id', function (req, res){
  // console.log(req.body);
  Profile.update(req.body,req.params.id)
  res.redirect('/profiles');
})

router.get('/profiles/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Profile.remove(req.params.id);
  res.redirect('/profiles');
})

module.exports = router