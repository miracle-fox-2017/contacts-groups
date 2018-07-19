const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles');
const Contact = require('../models/contacts');
// PROFILES
router.get('/', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Username sudah ada atau nama Kontack sudah digunakan"
  }
    Contact.findAll()
      .then(dataContacts=>{
        return Profile.findAllProfileContacts()
          .then(dataProfiles=>{
              res.render('profiles', {msgError:msgError,rowsProfiles:dataProfiles, dataContacts:dataContacts})
          })
            .catch(err=>{
              res.send(err)
            })
      })
})

router.post('/', (req, res)=>{
  Profile.create(req.body)
    .then(()=>{
      res.redirect('/profiles')
    })
      .catch(()=>{
        res.redirect('/profiles/?msgError=true')
      })
})

router.get('/edit/:id', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Username sudah ada atau nama Kontack sudah digunakan"
  }
  Contact.findAll()
    .then(dataContacts=>{
      return Profile.getById(req.params.id)
        .then(dataProfile =>{
          res.render('editProfile', {msgError:msgError,dataProfiles:dataProfile, dataContacts:dataContacts})
        })
    })
      .catch(err=>{
        res.send(err)
      })
})

router.post('/edit/:id', (req, res)=>{
  Profile.update(req.params.id, req.body)
    .then(()=>{
      res.redirect('/profiles')
    })
      .catch(()=>{
        res.redirect(`/profiles/edit/${req.params.id}?msgError=true`)
      })
})

router.get('/delete/:id', (req, res)=>{
  Profile.remove(req.params.id)
    .then(()=>{
      res.redirect('/profiles')
    })
      .catch(err=>{
        res.send(err)
      })
})


module.exports = router;
