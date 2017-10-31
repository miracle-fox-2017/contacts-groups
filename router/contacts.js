
const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts')


router.get('/contacts',function(req,res){
  let edit = false;
  Contact.findAll(function(err,rowContacts){
    if(!err){
      res.render('contacts',{rowContacts, edit})
    }
  })
})

router.post('/contacts',function(req,res){
  let edit = false;
  let obj = {name:req.body.name,
             company:req.body.company,
             telp_number:req.body.telp_number,
             email:req.body.email}
  Contact.create(obj,function(err,rowContacts){
    if(!err){
      res.redirect('contacts')
    }
  })
})


router.get('/contacts/delete/:id',function(req,res){
  Contact.remove(req.params.id, function() {
    res.redirect('/contacts')
  })    
})

router.get('/contacts/edit/:id',function(req,res){
  let request = {params: req.params.id};
  let edit = true;

  Contact.Update(request, (err, rowContacts)=>{
    if(err){console.log(err)}
    console.log(rowContacts);
    res.render('contacts', {rowContacts:rowContacts, edit:true})
  })
})

router.post('/contacts/edit/:id', function(req,res){
  let Obj = {
    id : req.params.id,
    name : req.body.name,
    company : req.body.company,
    telp_number : req.body.telp_number,
    email : req.body.email,
  }
  Contact.EditPost(Obj,(err,rowContacts)=>{
    if(!err){console.log(err)}
    res.redirect('/contacts')
  })
})

module.exports = router;
