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
  Contact.findAll((err, dataContacts)=>{
    if(!err){
      Profile.findAll((err, dataProfiles)=>{
        if(!err){
          dataProfiles.forEach((rows, index)=>{
            Contact.getById(rows.ContactsId, (err, Contacts)=>{
              if(!err){
                if(rows.ContactsId){
                  rows.name = Contacts.name
                }
                if(dataProfiles.length -1 == index){
                  // console.log(dataProfiles);
                  res.render('profiles', {msgError:msgError,rowsProfiles:dataProfiles, dataContacts:dataContacts})
                }
              }else {
                res.send(err)
              }
            })
          })
        } else {
          console.log(err);
          res.send(err)
        }
      })
    } else {
      res.send(err)
    }
  })
})

router.post('/', (req, res)=>{
  Profile.create(req.body, (err)=>{
    if(!err){
      res.redirect('/profiles')
    } else  {
      res.redirect('/profiles/?msgError=true')
    }
  })
})

router.get('/edit/:id', (req, res)=>{
  let msgError;
  if(req.query.hasOwnProperty('msgError')){
    msgError = "Username sudah ada atau nama Kontack sudah digunakan"
  }
  Contact.findAll((err, dataContacts)=>{
    if(!err){
      Profile.getById(req.params.id, (err, dataProfile) =>{
        if(!err){
            res.render('editProfile', {msgError:msgError,dataProfiles:dataProfile, dataContacts:dataContacts})
        } else {
          console.log(err);
          res.send(err)
        }
      })
    } else {
      res.send(err)
      console.log(err);
    }
  })
})

router.post('/edit/:id', (req, res)=>{
  Profile.update(req.params.id, req.body, (err)=>{
    if(!err){
      res.redirect('/profiles')
    } else {
      res.redirect(`/profiles/edit/${req.params.id}?msgError=true`)
    }
  })
})

router.get('/delete/:id', (req, res)=>{
  Profile.remove(req.params.id, (err)=>{
    if(!err){
      res.redirect('/profiles')
    } else {
      res.send(err)
    }
  })
})


module.exports = router;
