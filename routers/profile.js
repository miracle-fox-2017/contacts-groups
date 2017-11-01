const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');


router.get('/', (req, res)=>{
  Profile.findAll((err, dataProfile, dataContact)=>{
    if (!err) {
      let dataProf = {
        message : '',
        rows : dataProfile,
        data : dataContact,
      }
      res.render('profile', dataProf)
    }else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  Profile.create(req, (err, check, dataP)=>{
    if (!err) {
      if (check != 0) {
        Profile.findAll((err, dataProfile, dataContact)=>{
          if (!err) {
            let dataProf = {
              message : 'Your contact already have profile',
              rows : dataProfile,
              data : dataContact,
            }
            res.render('profile', dataProf)
          }else {
            res.send(err)
          }
        })
      }else {
        if (!err) {
          res.redirect('/profiles')
        }
      }
    }else {
      res.send(err)
    }

  })
})

router.get('/edit/:id', (req, res)=>{
  Profile.findById(req, (err, dataProfile, dataContact)=>{
    if (!err) {
      let dataProf = {
        message : '',
        rows : dataProfile,
        data : dataContact,
      }
      res.render('profile-edit', dataProf)
    }else {
      res.send(err)
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  Profile.update(req, (err, dataProfile)=>{
    if (!err) {

      res.redirect('/profiles')
    }else {
      res.send(err)
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Profile.remove(req, (err, dataProfile)=>{
    if (!err) {
      res.redirect('/profiles')
    }else {
      res.send(err)
    }
  })
})







module.exports = router;
