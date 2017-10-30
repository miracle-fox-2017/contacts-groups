const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts')
//menampilkan contact
router.get('/contacts',function(req,res){
  let isEdit = false
  Contact.findAll(function(err,contactsRows){
    if(!err){
      res.render('contacts',{contactsRows, isEdit})
    }
  })
})
//menambahkan contact
router.post('/contacts',function(req,res){
  let isEdit = false;
  let obj = {name:req.body.name,
             company:req.body.company,
             telp_number:req.body.telp_number,
             email:req.body.email}
  Contact.create(obj,function(err,contactsRows){
    if(!err){
      res.redirect('contacts')
    }
  })
})
//delete contact
router.get('/contacts/delete/:id',function(req,res){
  let id = req.params.id
  Contact.delete(id)
  res.redirect('/contacts')
 })
//edit contact get
router.get('/contacts/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Contact.findById(id,function(err,contactsRows){
    if(!err){
      res.render('contacts',{contactsRows, isEdit})
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
  Contact.update(obj)
  res.redirect('/contacts')
})
module.exports = router
