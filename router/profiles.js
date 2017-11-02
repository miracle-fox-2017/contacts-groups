const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Profile = require('../models/profiles')
//menampilkan profile
router.get('/profiles',function(req,res){
  let isEdit = false
  Profile.findAll().then((dataProfile)=>{
    Contact.findAll().then((dataContact)=>{
      res.render('profiles',{dataProfile,dataContact,isEdit})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
//menambahkan profile
router.post('/profiles',function(req,res){
  //let isEdit = false;
  let obj = {username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.create(obj).then((dataProfile)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
})
//delete profile
router.get('/profiles/delete/:id',function(req,res){
  let id = req.params.id
  Profile.delete(id).then((dataProfile)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
 })
//edit profile get
router.get('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Profile.findById(id).then((dataProfile)=>{
    Contact.findAll().then((dataContact)=>{
      res.render('profiles',{dataProfile,dataContact,isEdit})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
//edit profile post
router.post('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.update(obj).then((dataProfile)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router
