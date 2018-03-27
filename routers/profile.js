const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.js');
const Contact = require('../models/contacts')



router.get('/profile', (req, res) =>{
  Profile.findAll().then(dataProfiles =>{
    Contact.findAll().then(dataContacts =>{
      res.render('profile/profile', {err:null,dataContacts:dataContacts, dataProfile:dataProfiles})
      }).catch(err =>{
      console.log(err);
    })
  })
})


router.post('/profile', (req, res) =>{
  Profile.create(req).then(() =>{
    res.redirect('/profile')
  }).catch(msg=>
    Profile.findAll().then(dataProfile =>{
      Contact.findAll().then(dataContacts =>{
        res.render('profile/profile', {err:msg, dataProfile:dataProfile, dataContacts:dataContacts})
      })
    })
  )
})


router.get('/profile/edit/:id', (req, res) =>{
  Profile.findById(req).then(dataProfile =>{
    Contact.findAll().then(dataContacts =>{
      res.render('profile/edit', {err: null, dataProfile:dataProfile, dataContacts:dataContacts})
    })
  }).catch(err =>{
    console.log(err);
  })
})

// router.get('/profile/edit/:id', (req, res) => {
//   Profile.findById(req, dataProfile => {
//     Contact.findAll(dataContacts =>{
//       res.render('profile/edit', {dataProfile:dataProfile, dataContacts:dataContacts})
//     })
//   })
// })

router.post('/profile/edit/:id', (req, res) => {
  Profile.update().then(() =>{
    res.redirect('/profile')
  }).catch(msg =>{
    Profile.findById(req).then(dataProfile =>{
      Contact.findAll().then(dataContacts =>{
        res.render('profile/edit', {err:msg, dataProfile:dataProfile, dataContacts:dataContacts})
      })
    })
  })
})

router.get('/profile/delete/:id', (req, res) => {
  Profile.destroy(req).then(() =>{
    res.redirect('/profile')
  })
})


module.exports = router;
