const express = require('express');
const router = express.Router();

const Profile = require('../models/profiles')
//menampilkan contact
router.get('/profiles',function(req,res){
  let isEdit = false
  Profile.findAll(function(err,profilesRows){
    if(!err){
      res.render('profiles',{profilesRows, isEdit})
    }
  })
})
//menambahkan contact
router.post('/profiles',function(req,res){
  let isEdit = false;
  let obj = {username:req.body.username,
             password:req.body.password}
  Profile.create(obj,function(err,profilesRows){
    if(!err){
      res.redirect('profiles')
    }
  })
})
//delete contact
router.get('/profiles/delete/:id',function(req,res){
  let id = req.params.id
  Profile.delete(id)
  res.redirect('/profiles')
 })
//edit contact get
router.get('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Profile.findById(id,function(err,profilesRows){
    if(!err){
      res.render('profiles',{profilesRows, isEdit})
    }
  })
})
//edit contact post
router.post('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             username:req.body.username,
             password:req.body.password}
  Profile.update(obj)
  res.redirect('/profiles')
})
module.exports = router
