const express = require('express');
const router = express.Router();

const Profile = require('../models/profile')

router.get('/profiles', function (req, res) {
  Profile.findAll(function(rows)
  {
    // console.log(rows);
    res.render('profiles', {rows})
  })
})

router.post('/profiles', function (req, res) {
  // console.log(req.body);
  Profile.create(req.body);
  res.redirect('/profiles');
})

router.get('/profiles/edit/:id', function (req, res) {
  // console.log(req.params);
  Profile.findID(req.params.id, function(rows){
    res.render('profileedit', {rows})
  })
})

router.post('/profiles/edit/:id', function (req, res){
  // console.log('masuk UPDATE');
  Profile.update(req.body,req.params.id)
  res.redirect('/profiles');
})

router.get('/profiles/delete/:id', function (req, res) {
  // console.log('masuk DELETE');
  Profile.remove(req.params.id);
  res.redirect('/profiles');
})

module.exports = router