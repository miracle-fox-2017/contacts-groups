const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

router.get('/', (req, res) => {
  Profile.getAll((err, profilesData) => {
    res.render('profiles', {title:'Profiles', profiles:profilesData})
  })
})

function addRender(req, res, errMsg) {
  Contact.getAll((err, contactsData) => {
    res.render('profiles/add', {title:'Add Profile', contacts:contactsData, err:errMsg})
  })
}

router.get('/add', (req, res) => {
  addRender(req, res)
})

router.post('/add', (req, res) => {
  Profile.create(req.body, err => {
    if(!err){
      res.redirect('/profiles')
    }else{
      addRender(req, res, err)
    }
  })
})

function editRender(req, res, err) {
  Profile.getOne(req.params.id, (err, profile) => {
    if(!err){
      Contact.getAll((err, contactsData) => {
        res.render('profiles/edit', {title:'Edit Profile', profile:profile, contacts:contactsData, err:err});
      })
    }else{
      res.send(err)
    }
  })
}

router.get('/edit/:id', (req, res) => {
  editRender(req, res)
})

router.post('/edit/:id', (req, res) => {
  Profile.update(req.body, req.params.id, err => {
    if(!err){
      res.redirect('/profiles')
    }else{
      editRender(req, res, err)
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Profile.destroy(req.params.id, err => {
    if(!err){
      res.redirect('/profiles')
    }else{
      res.send(err)
    }
  })
})

module.exports = router;
