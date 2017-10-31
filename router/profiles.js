const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Profile = require('../models/profiles')
//menampilkan profile
router.get('/profiles',function(req,res){
  let isEdit = false
  Profile.findAll(function(err,profilesRows){
    if(!err){
      Contact.findAll(function(err,contactsRows){
        if(!err){
          res.render('profiles',{profilesRows, contactsRows, isEdit})
        }
      })

    }
  })
})
//menambahkan profile
router.post('/profiles',function(req,res){
  let isEdit = false;
  let obj = {username:req.body.username,
             password:req.body.password}
  Profile.create(obj,function(err,profilesRows){
    if(!err){
      res.redirect('/profiles')
    }
  })
})
//delete profile
router.get('/profiles/delete/:id',function(req,res){
  let id = req.params.id
  Profile.delete(id)
  res.redirect('/profiles')
 })
//edit profile get
router.get('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Profile.findById(id,function(err,profilesRows){
    if(!err){
      Contact.findAll(function(err,contactsRows){
        if(!err){
          res.render('profiles',{profilesRows, contactsRows, isEdit})
        }
      })

    }
  })
})
//edit profile post
router.post('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.update(obj)
  res.redirect('/profiles')
})
module.exports = router
