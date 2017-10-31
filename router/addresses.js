const express = require('express');
const router = express.Router();

const Address = require('../models/addresses')
//menampilkan contact
router.get('/addresses',function(req,res){
  let isEdit = false
  Address.findAll().then((addressesRows)=>{
    res.render('addresses',{addressesRows, isEdit})
  }).catch((err)=>{
    console.log(err)
  })
})
//menambahkan contact
router.post('/addresses',function(req,res){
  let isEdit = false;
  let obj = {street:req.body.street,
             city:req.body.city,
             zipcode:req.body.zipcode}
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
    res.render('addresses',{addressesRows, isEdit})
  }).catch((err)=>{
    console.log(err)
  })
})
//edit contact post
router.post('/addresses/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             street:req.body.street,
             city:req.body.city,
             zipcode:req.body.zipcode}
  Address.update(obj).then((addressesRows)=>{
    console.log(obj)
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
})
module.exports = router
