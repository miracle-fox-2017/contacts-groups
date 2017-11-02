const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Address = require('../models/addresses')

router.get('/addresses',function(req,res){
  let isEdit = false
  Address.findAll().then((addressesRows)=>{
    Contact.findAll().then((contactsRows)=>{
      res.render('addresses',{addressesRows,contactsRows,isEdit})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
//menambahkan contact
router.post('/addresses',function(req,res){
  let isEdit = false;
  let obj = {street:req.body.street,
             city:req.body.city,
             zipcode:req.body.zipcode,
             contacts_id:req.body.contact}
  Address.create(obj).then((addressesRows)=>{
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
})
//delete contact
router.get('/addresses/delete/:id',function(req,res){
  let id = req.params.id
  Address.delete(id).then((addressesRows)=>{
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
 })
//edit contact get
router.get('/addresses/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Address.findById(id).then((addressesRows)=>{
    Contact.findAll().then((contactsRows)=>{
      res.render('addresses',{addressesRows,contactsRows,isEdit})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
//edit contact post
router.post('/addresses/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             street:req.body.street,
             city:req.body.city,
             zipcode:req.body.zipcode,
             contacts_id:req.body.contact}
  Address.update(obj).then((addressesRows)=>{
    console.log(obj)
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
})
module.exports = router
