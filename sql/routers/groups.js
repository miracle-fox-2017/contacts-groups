const express = require('express')
const router = express.Router()
let Groups = require('../models/groups');

//GROUP
router.get('/',function(req,res){
  console.log('ahskah');
  Groups.findAllGroups((err,rows)=>{
    if(err){console.log(err)}
    res.render('groups', {rows:rows, isEdit: false})
  })
})
router.post('/', function(req,res){
  let Obj = {name : req.body.name,}
  Groups.groupsCreate(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/groups')
  })
})
router.get('/edit/:id',function(req,res){
  let isEdit = true;
  let Obj = {id : req.params.id,}
  Groups.groupUpdate(Obj, (err, rows)=>{
    if(err){console.log(err)}
    res.render('groups', {rows:rows, isEdit:true})
  })
})
router.post('/edit/:id', function(req,res){
  let Obj = {
     id : req.params.id,
     name : req.body.name,
  }
  Groups.groupUpdatePost(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/groups')
  })
})
router.get('/delete/:id', function(req,res){
  let Obj = {id : req.params.id}
  Groups.remove(Obj, (err,rows)=>{
    if(err){console.log(err)}
    res.redirect('/groups')
  })
})

module.exports = router;
