const express = require('express');
const router = express.Router();

const Group = require('../models/groups')
//menampilkan groups
router.get('/groups',function(req,res){
  let isEdit = false
  Group.findAll().then((groupsRows)=>{
    res.render('groups',{groupsRows, isEdit})
  }).catch((err)=>{
    console.log(err)
  })
})
//menambahkan groups
router.post('/groups',function(req,res){
  let isEdit = false;
  let obj = {name_of_group:req.body.name_of_group}
  Group.create(obj,function(err,groupsRows){
    if(!err){
      res.redirect('groups')
    }
  })
})
//delete groups
router.get('/groups/delete/:id',function(req,res){
  let id = req.params.id
  Group.delete(id)
  res.redirect('/groups')
 })
//edit groups get
router.get('/groups/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Group.findById(id,function(err,groupsRows){
    if(!err){
      res.render('groups',{groupsRows, isEdit})
    }
  })
})
//edit groups post
router.post('/groups/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             name_of_group:req.body.name_of_group}
  Group.update(obj)
  res.redirect('/groups')
})
module.exports = router
