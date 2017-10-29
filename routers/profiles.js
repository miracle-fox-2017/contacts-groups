const express = require('express')
const Profile = require('../models/profiles')

const router = express.Router()

// define the profiles page route
router.get('/', function(req, res) {
  Profile.findAll((err, rows) => {
    res.render('profiles/index', {error: err, dataProfiles: rows})
  })
})

router.get('/add', function(req, res) {
  res.render('profiles/add')
})

router.post('/add', function(req, res) {
  Profile.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/profiles')
  })
})

router.get('/edit/:id', function(req, res) {
  Profile.findById(req.params.id, (err, rows) => {
    res.render('profiles/edit', {error: err, dataProfile: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  Profiles.update(req.body, req.param.id, (err) => {
    if(err) res.send(err)
    res.redirect('/profiles')
  })
})

router.get('/delete/:id', function(req, res) {
  Profile.delete(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/profiles')
  })
})

module.exports = router
