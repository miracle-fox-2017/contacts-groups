const express = require('express');
const router = express.Router();
const group = require('../models/groups');

//Groups
router.get('/groups',function(req,res){
  group.findAll(function(err,rows) {
    res.render('groups',{rows})
  })
})

//add
router.post('/groups',function(req,res){
  console.log(req.body);
group.create(req.body,function(err,rows) {
  res.redirect('/groups')
  })
})

//delete
router.get('/groups/delete/:id',function(req,res) {
  group.remove(req.params.id,function(err,rows) {
    res.redirect('/groups')
  })
})

//edit
router.get('/groups/edit/:id',function(req,res) {
group.findById(req.params.id,function(err,rows) {
  res.render('editgroups',{rows})
  })
})

router.post('/groups/edit/:id',function(req,res) {
  group.update(req.body,req.params.id);
  res.redirect('/groups')
})
module.exports = router;
