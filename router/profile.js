const express = require('express');
const router = express.Router();
const contacts = require('../models/contacts')
const profile = require('../models/profiles')


//Profile
router.get('/profile',function(req,res){
profile.findAllWithContact(function(err,rows) {
  contacts.findAll(function(err,dataCon) {
  //  console.log(rows);
    res.render('profile',{rows :rows,dataCon:dataCon, message : ''})
    })
  })
})
//add
router.post('/profile',function(req,res) {
profile.create(req.body,function(err) {
  if(err){
    profile.findAllWithContact(function(err,rows) {
      contacts.findAll(function(err,dataCon) {
      //  console.log(rows);
        res.render('profile',{rows :rows,dataCon:dataCon, message : 'Data sama'})
        })
      })
  }else{
    res.redirect('/profile')
  }

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
    contacts.findAll(function(err,dataCon) {
      res.render('editprofile',{rows: rows,dataCon:dataCon})
    })
  })
})

router.post('/profile/edit/:id',function(req,res) {
profile.update(req.body,req.params.id);
res.redirect('/profile')
})
module.exports = router;
