const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts')
//menampilkan contact
router.get('/contacts',function(req,res){
  let isEdit = false
  Contact.findAll().then((contactsRows)=>{
    res.render('contacts',{contactsRows, isEdit})
  }).catch((err)=>{
    console.log(err)
  })
})
//menambahkan contact
router.post('/contacts',function(req,res){
  let isEdit = false;
  let obj = {name:req.body.name,
             company:req.body.company,
             telp_number:req.body.telp_number,
             email:req.body.email}
  Contact.create(obj).then((contactsRows)=>{
    res.redirect('/contacts')
  }).catch((err)=>{
    console.log(err)
  })
})
//delete contact
router.get('/contacts/delete/:id',function(req,res){
  let id = req.params.id
  Contact.delete(id).then((contactsRows)=>{
    res.redirect('/contacts')
  }).catch((err)=>{
    console.log(err)
  })
 })
//edit contact get
router.get('/contacts/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Contact.findById(id).then((contactsRows)=>{
    res.render('contacts',{contactsRows, isEdit})
  }).catch((err)=>{
    console.log(err)
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
  Contact.update(obj).then((contactsRows)=>{
    res.redirect('/contacts')
  }).catch((err)=>{
    console.log(err)
  })
})
module.exports = router
