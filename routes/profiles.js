const express = require('express')
const router = express.Router()
const Profiles = require('../models/profiles')
const Contacts = require('../models/contacts')

router.get('/', (req, res) => {
  Profiles.getAll(profilesData => {
    res.render('profiles', {title:'Profiles', profiles:profilesData})
  })
})

function addRender(req, res, err) {
  Contacts.getAll(contactsData => {
    res.render('profiles/add', {title:'Add Profile', contacts:contactsData, err:err})
  })
}

router.get('/add', (req, res) => {
  addRender(req, res)
})

router.post('/add', (req, res) => {
  Profiles.create(req.body,err => {
    if(err){
      addRender(req, res, err)
    }else{
      res.redirect('/profiles')
    }
  })
})

function editRender(req, res, err) {
  Profiles.getOne(req.params.id, profile => {
    Contacts.getAll(contactsData => {
      res.render('profiles/edit', {title:'Edit Profile', profile:profile, contacts:contactsData, err:err});
    })
  })
}

router.get('/edit/:id', (req, res) => {
  editRender(req, res)
})

router.post('/edit/:id', (req, res) => {
  Profiles.update(req.body, req.params.id, err => {
    if(err){
      editRender(req, res, err)
    }else{
      res.redirect('/profiles')
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Profiles.destroy(req.params.id)
  res.redirect('/profiles')
})

module.exports = router;
