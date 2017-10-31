const express = require('express');
const router = express.Router();

//require FILE models
const Group = require('../models/group')


//Menampilkan semua data groups
router.get('/groups',function(req,res){
  Group.findAll(function(rowGroups){
    res.render('groups',{rowGroups})
  })
})
//Menerima data form untuk input group
router.post('/groups',function(req,res){
  Group.inputGroup(req.body)
  res.redirect('/groups')
})
//Menampilkan data group spesifik untuk diubah
router.get('/groups/edit/:id',function(req,res){
  Group.findID(req.param.id,function(rowGroups){
    res.render('editgroups',{rowGroups})
  })
})
//Menerima data form untuk update group
router.post('/groups/edit/:id',function(req,res){
  Group.editGroup(req.params.id,req.body)
  res.redirect('/groups')
})
//Menghapus data group berdasarkan id
router.get('/groups/delete/:id',function(req,res){
  Group.deleteGroup(req.params.id)
    res.redirect('/groups')
})

module.exports = router
