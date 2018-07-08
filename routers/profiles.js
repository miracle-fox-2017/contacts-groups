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
  Contact.showContacts()
   .then(contacts=>{
      Profile.showProfilesJoin()
       .then(profiles=>{
        res.render('profiles',{"profiles": profiles, "contacts": contacts, "msg": ""});
      })
  }).catch(err=>{
    console.log(err);
  })
  
  // let promise = [];
  // promise.push(Contact.showContacts());
  // promise.push(Profile.showProfilesJoin());
  // 
  // Promise.all(promise).then(
  //   success =>{
  //     res.render('profiles',{"profiles": success[1], "contacts": success[0], "msg": ""});
  //   }
  // ).catch(
  //   err => {
  //     res.send(err)
  //   }
  // )
  
  // Contact.showContacts(function(contacts){
  //   Profile.showProfilesJoin(function(profile){
  //     res.render('profiles',{"rows": profile, "contacts": contacts, "msg": ""});
  //   })
  // })
  
})

//POST PROFILES
router.post('/', function (req, res) {
  // Profile.checkId(req.body.id_contacts)
  //   .then(avail=>{
        Profile.insertProfile(req.body)
          .then((msg)=>{
            // console.log(msg.changes); 
            Contact.showContacts()
              .then(contacts =>{
                Profile.showProfilesJoin()
                  .then(profiles => {
                    if(msg.changes != 0){
                      res.render('profiles',{"profiles": profiles, "contacts": contacts, "msg": ""});
                    } else {
                      res.render('profiles',{"profiles": profiles, "contacts": contacts, "msg": "Your contact already have profile"});  
                    }
                  })
              })
          // })
    }).catch(err=>{
      console.log(err);
    })
    
  // Profile.checkId(req.body.id_contacts).then(avail=>{
  //   let promise = [];
  //   promise.push(Profile.insertProfile(req.body));
  //   promise.push(Contact.showContacts()); //return contacts
  //   promise.push(Profile.showProfilesJoin()); //return profiles
  //   
  //   Promise.all(promise).then(
  //     success =>{
  //       if(avail == 0){
  //         res.render('profiles',{"profiles": success[2], "contacts": success[1], "msg": ""});
  //       } else {
  //         res.render('profiles',{"profiles": success[2], "contacts": success[1], "msg": "Your contact already have profile"});
  //       }
  //     }
  //   ).catch(
  //     err => {
  //       res.send(err)
  //     }
  //   )
  // }).catch(err=>{
  //   res.send(err);
  // })
  
  // let promise = [];
  // promise.push(Profile.insertProfile(req.body));
  // promise.push(Contact.showContacts()); //return contacts
  // promise.push(Profile.showProfilesJoin()); //return profiles
  // 
  // Promise.all(promise).then(
  //   success =>{
  //     if(success[0] == 0){
  //       res.render('profiles',{"profiles": success[2], "contacts": success[1], "msg": ""});
  //     }
  //   }
  // ).catch(
  //   err => {
  //     res.send(err)
  //   }
  // )
  // Profile.checkId(req.body.id_contacts, function(avail){
  //   // console.log(avail);
  //   if(avail == 0){
  //     Profile.insertProfile(req.body, function(last){
  //       Contact.showContacts(function(contacts){
  //         Profile.showProfilesJoin(function(profile){
  //           res.render('profiles',{"rows": profile, "contacts": contacts, "msg": ""});
  //         })
  //       })
  //       
  //     })
  //   } else {
  //     Contact.showContacts(function(contacts){
  //       Profile.showProfilesJoin(function(profile){
  //         res.render('profiles',{"rows": profile, "contacts": contacts, "msg": "Your contact already have profile"});
  //       })
  //     })
  //   }
  // })
  
})

//GET PROFILES EDIT
router.get('/edit/:id', function (req, res) {
  Contact.showContacts()
  .then(contacts => {
      Profile.showSpecificId(req.params.id)
      .then(profile => {
        res.render('profiles_edit',{"rows": profile, "contacts": contacts});
      })
  }).catch(err=>{
      console.log(err);
  })
  
  // Contact.showContacts(function(contacts){
  //   Profile.showSpecificId(req.params.id, function(profile){
  //     res.render('profiles_edit',{"rows": profile, "contacts": contacts});
  //   })
  // })
  
})

//POST PROFILES EDIT
router.post('/edit/:id', function (req, res){
  Profile.updateProfile(req.body)
  .then(()=>{
    res.redirect('/profiles');
  }).catch(err=>{
    console.log(err);
  })
  // Profile.updateProfile(req.body, function(){
  //   Contact.showContacts(function(contacts){
  //     Profile.showSpecificId(req.params.id, function(profile){
  //       // res.render('profiles_edit',{"rows": profile, "contacts": contacts});
  //       res.redirect('/profiles');
  //     })
  //   })
  // })
  
})

//DELETE PROFILES ID
router.get('/delete/:id', function (req, res){
  Profile.deleteProfile(req.params.id)
  .then(()=>{
    res.redirect('/profiles');
  }).catch(err=>{
    console.log(err);
  })
    
  // Profile.deleteProfile(req.params.id, function(){
  //   res.redirect('/profiles');
  // })
})


module.exports = router;