const express = require('express')
const router = express.Router()
const Profile = require('../models/profile.js');

//console.log(Address);
router.get('/profile', (req, res) => {
  Profile.findAll(dataProfile =>{
    //res.send(dataProfile)
    res.render('profile/profile', {dataProfile:dataProfile})
  })
})

router.post('/profile', (req, res) => {
  Profile.create(req, dataProfile => {
    res.redirect('/profile')
  })
})

router.get('/profile/edit/:id', (req, res) => {
  Profile.findById(req, dataProfile => {
    res.render('profile/edit', {dataProfile:dataProfile})
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
