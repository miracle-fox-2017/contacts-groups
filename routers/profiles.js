var express = require('express');
var router = express.Router();

//require models
const Contact = require('../models/contact');
// const Group = require('../models/group');
const Profile = require('../models/profile');
// const Address = require('../models/address');
const ContactGroup = require('../models/contactgroup');


//GET PROFILES
router.get('/', function (req, res) {
  Contact.showContacts(function(contacts){
    Profile.showProfilesJoin(function(profile){
      res.render('profiles',{"rows": profile, "contacts": contacts, "msg": ""});
    })
  })
  
})

//POST PROFILES
router.post('/', function (req, res) {
  Profile.checkId(req.body.id_contacts, function(avail){
    // console.log(avail);
    if(avail == 0){
      Profile.insertProfile(req.body, function(last){
        Contact.showContacts(function(contacts){
          Profile.showProfilesJoin(function(profile){
            res.render('profiles',{"rows": profile, "contacts": contacts, "msg": ""});
          })
        })
        
      })
    } else {
      Contact.showContacts(function(contacts){
        Profile.showProfilesJoin(function(profile){
          res.render('profiles',{"rows": profile, "contacts": contacts, "msg": "Your contact already have profile"});
        })
      })
    }
  })
  
})

//GET PROFILES EDIT
router.get('/edit/:id', function (req, res) {
  Contact.showContacts(function(contacts){
    Profile.showSpecificId(req.params.id, function(profile){
      res.render('profiles_edit',{"rows": profile, "contacts": contacts});
    })
  })
  
})

//POST PROFILES EDIT
router.post('/edit/:id', function (req, res){
  Profile.updateProfile(req.body, function(){
    Contact.showContacts(function(contacts){
      Profile.showSpecificId(req.params.id, function(profile){
        // res.render('profiles_edit',{"rows": profile, "contacts": contacts});
        res.redirect('/profiles');
      })
    })
  })
  
})

//DELETE PROFILES ID
router.get('/delete/:id', function (req, res){
  Profile.deleteProfile(req.params.id, function(){
    res.redirect('/profiles');
  })
})


module.exports = router;