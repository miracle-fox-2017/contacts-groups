const express = require('express');
const router = express.Router();

const Group = require('../models/groups')
//menampilkan contact
router.get('/groups',function(req,res){
  let isEdit = false
  Group.findAll(function(err,groupsRows){
    if(!err){
      res.render('groups',{groupsRows, isEdit})
    }
  })
})
//menambahkan contact
router.post('/groups',function(req,res){
  let isEdit = false;
  let obj = {name_of_group:req.body.name_of_group}
  Group.create(obj,function(err,groupsRows){
    if(!err){
      res.redirect('groups')
    }
  })
})
//delete contact
router.get('/groups/delete/:id',function(req,res){
  let id = req.params.id
  Group.delete(id)
  res.redirect('/groups')
 })
//edit contact get
router.get('/groups/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Group.findById(id,function(err,groupsRows){
    if(!err){
      res.render('groups',{groupsRows, isEdit})
    }
  })
})
//edit contact post
router.post('/groups/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             name_of_group:req.body.name_of_group}
  Group.update(obj)
  res.redirect('/groups')
})
module.exports = router
