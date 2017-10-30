const express = require('express');
const router = express.Router();

const Address = require('../models/addresses')
//menampilkan contact
router.get('/addresses',function(req,res){
  let isEdit = false
  Address.findAll(function(err,addressesRows){
    if(!err){
      res.render('addresses',{addressesRows, isEdit})
    }
  })
})
//menambahkan contact
router.post('/addresses',function(req,res){
  let isEdit = false;
  let obj = {street:req.body.street,
             city:req.body.city,
             zipcode:req.body.zipcode}
  Address.create(obj,function(err,addressesRows){
    if(!err){
      res.redirect('addresses')
    }
  })
})
//delete contact
router.get('/addresses/delete/:id',function(req,res){
  let id = req.params.id
  Address.delete(id)
  res.redirect('/addresses')
 })
//edit contact get
router.get('/addresses/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Address.findById(id,function(err,addressesRows){
    if(!err){
      res.render('addresses',{addressesRows, isEdit})
    }
  })
})
//edit contact post
router.post('/addresses/edit/:id',function(req,res){
  let isEdit = true;
  let obj = {id:req.params.id,
             street:req.body.street,
             city:req.body.city,
             zipcode:req.body.zipcode}
  Address.update(obj)
  res.redirect('/addresses')
})
module.exports = router
