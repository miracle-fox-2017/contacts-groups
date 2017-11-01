const express = require('express');
const router = express.Router();
// const contacts = require('../models/contacts')
const profile = require('../models/profiles')


//Profile
router.get('/profile',function(req,res){
profile.findAll(function(err,rows) {
  res.render('profile',{rows})
  })
})
//add
router.post('/profile',function(req,res) {
profile.create(req.body,function(err,rows) {
  res.redirect('/profile')
  })
})

//delete
router.get('/profile/delete/:id',function(req,res) {
profile.remove(req.params.id,function(err,rows) {
  res.redirect('/profile')
  })
})

//edit
router.get('/profile/edit/:id',function(req,res) {
profile.findById(req.params.id,function(err,rows) {
  res.render('editprofile',{rows})
  })
})

router.post('/profile/edit/:id',function(req,res) {
profile.update(req.body,req.params.id);
res.redirect('/profile')
})
module.exports = router;
