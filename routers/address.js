const express = require('express');
const router = express.Router();

//require FILE models
const Address = require('../models/address');
const Contact =require('../models/contact')



//Menampilkan semua data addresses
router.get('/addresses',function(req,res){
  Address.findAllwithContact(function(rowAddresses){
    Contact.findAll(function(rowContacts){
      res.render('addresses',{rowAddresses,rowContacts})
    })
  })
})


//Menerima data form untuk input address
router.post('/addresses',function(req,res){
  Address.inputAddress(req.body,function(err){
    if(!err){
      res.redirect('/addresses')

    }else{
      res.redirect('/addresses?error=true')
    }
  })
})
//Menampilkan data address spesifik untuk diubah
router.get('/addresses/edit/:id',function(req,res){
  Address.findAddress(req.params.id,function(err,rowAddresses){
    Contact.findAll(function(rowContacts){
    res.render('editaddresses',{rowAddresses,rowContacts})
    })
  })
})
//Menerima data form untuk update address
router.post('/addresses/edit/:id',function(req,res){
  Address.editAddress(req.params.id,req.body)
  res.redirect('/addresses')
})
//Menghapus data address berdasarkan id
router.get('/addresses/delete/:id',function(req,res){
  Address.deleteAddress(req.params.id,function(err,rowAddresses){
    res.redirect('/addresses')
  })

})

module.exports=router
