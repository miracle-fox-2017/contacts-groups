
const express = require('express');
const router = express.Router();

const Groups = require('../models/groups')


router.get('/groups',function(req,res){
  let edit = false;
  Groups.findAll(function(err,rowGroups){
    if(!err){
      res.render('groups',{rowGroups, edit})
    }
  })
})

router.post('/groups',function(req,res){
  let edit = false;
  let obj = {name_of_group:req.body.name_of_group}
  Groups.create(obj,function(err,rowGroups){
    if(!err){
      res.redirect('groups')
    }
  })
})


router.get('/groups/delete/:id',function(req,res){
  Groups.remove(req.params.id, function() {
    res.redirect('/groups')
  })    
})

router.get('/groups/edit/:id',function(req,res){
  let request = {params: req.params.id};
  let edit = true;

  Groups.Update(request, (err, rowGroups)=>{
    if(err){console.log(err)}
    console.log(rowGroups);
    res.render('groups', {rowGroups:rowGroups, edit:true})
  })
})

router.post('/groups/edit/:id', function(req,res){
  let Obj = {
    id : req.params.id,
    name_of_group : req.body.name_of_group,
  }
  Groups.EditPost(Obj,(err,rowGroups)=>{
    if(!err){console.log(err)}
    res.redirect('/groups')
  })
})

module.exports = router
