const express = require('express');
const router = express.Router();

const Group = require('../models/groups')
//menampilkan groups
router.get('/groups',function(req,res){
  let isEdit = false
  Group.findAll().then((dataGroup)=>{
    res.render('groups',{dataGroup, isEdit})
  }).catch((err)=>{
    console.log(err)
  })
})

//menambahkan groups
router.post('/groups',function(req,res){
  let isEdit = false;
  let obj = {name_of_group:req.body.name_of_group}
  Group.create(obj).then((dataGroup)=>{
    res.redirect('/groups')
  }).catch((err)=>{
    console.log(err)
  })
})

//delete groups
router.get('/groups/delete/:id',function(req,res){
  let id = req.params.id
  Group.remove(id).then((dataGroup)=>{
    res.redirect('/groups')
  }).catch((err)=>{
    console.log(err)
  })
 })

//edit groups get
router.get('/groups/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Group.findById(id).then((dataGroup)=>{
    res.render('groups',{dataGroup, isEdit})
  }).catch((err)=>{
    console.log(err)
  })
})

//edit groups post
router.post('/groups/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             name_of_group:req.body.name_of_group}
  Group.update(obj).then((dataGroup)=>{
    res.redirect('/groups')
  }).catch((err)=>{
    console.log(err)
  })
})
module.exports = router
