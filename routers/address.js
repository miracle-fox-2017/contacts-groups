const express = require('express');
const router = express.Router();

//require FILE models
const Address = require('../models/address');



//Menampilkan semua data addresses
router.get('/addresses',function(req,res){
  Address.findAll(function(rowAddresses){
    res.render('addresses',{rowAddresses})
  })
})
//Menerima data form untuk input address
router.post('/addresses',function(req,res){
  Address.inputAddress(req.body)
  res.redirect('/addresses')
})
//Menampilkan data address spesifik untuk diubah
router.get('/addresses/edit/:id',function(req,res){
  Contact.findAddress(req.params.id,function(rowAddresses){
    res.render('editaddresses',{rowAddresses})
  })
})
//Menerima data form untuk update address
router.post('/addresses/edit/:id',function(req,res){
  Contact.editAddress(req.params.id,req.body)
  res.redirect('/addresses')
})
//Menghapus data address berdasarkan id
router.get('/addresses/delete/:id',function(req,res){
  Contact.deleteAddress(req.params.id)
    res.redirect('/addresses')
})

module.exports=router
