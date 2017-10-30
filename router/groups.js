const express = require('express');
const router = express.Router();

const Group = require('../models/groups')
//menampilkan contact
router.get('/contacts',function(req,res){
  let isEdit = false
  Group.findAll(function(err,GroupsRows){
    if(!err){
      res.render('contacts',{GroupsRows, isEdit})
    }
  })
})
//menambahkan contact
router.post('/contacts',function(req,res){
  let isEdit = false;
  let obj = {name_of_group:req.body.name_of_group}
  Group.create(obj,function(err,GroupsRows){
    if(!err){
      res.redirect('contacts')
    }
  })
})
//delete contact
router.get('/contacts/delete/:id',function(req,res){
  let id = req.params.id
  Group.delete(id)
  res.redirect('/contacts')
 })
//edit contact get
router.get('/contacts/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Group.findById(id,function(err,GroupsRows){
    if(!err){
      res.render('contacts',{GroupsRows, isEdit})
    }
  })
})
//edit contact post
router.post('/contacts/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             name:req.body.name,
             company:req.body.company,
             telp_number:req.body.telp_number,
             email:req.body.email}
  Group.update(obj)
  res.redirect('/contacts')
})
module.exports = router
