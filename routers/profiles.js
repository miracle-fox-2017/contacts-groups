const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles')
const Contact = require('../models/contacts')

router.get('/', (req, res) => {
  Profile.getAll().then(profilesData => {
    res.render('profiles', {title:'Profiles', profiles:profilesData})
  }).catch(err => {
    res.send(err)
  })
})

function addRender(req, res, errMsg) {
  Contact.getAll().then(contactsData => {
    res.render('profiles/add', {title:'Add Profile', contacts:contactsData, err:errMsg})
  }).catch(err => {
    res.send(err)
  })
}

router.get('/add', (req, res) => {
  addRender(req, res)
})

router.post('/add', (req, res) => {
  Profile.create(req.body).then(() => {
    res.redirect('/profiles')
  }).catch(err => {
    addRender(req, res, err)
  })
})

function editRender(req, res, err) {
  Promise.all([
    Profile.getOne(req.params.id),
    Contact.getAll()
  ]).then(rows => {
    res.render('profiles/edit', {title:'Edit Profile', profile:rows[0], contacts:rows[1], err:err});
  }).catch(err => {
    res.send(err)
  })
}

router.get('/edit/:id', (req, res) => {
  editRender(req, res)
})

router.post('/edit/:id', (req, res) => {
  Profile.update(req.body, req.params.id).then(() => {
    res.redirect('/profiles')
  }).catch(err => {
    editRender(req, res, err)
  })
})

router.get('/delete/:id', (req, res) => {
  Profile.destroy(req.params.id).then(() => {
    res.redirect('/profiles')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
