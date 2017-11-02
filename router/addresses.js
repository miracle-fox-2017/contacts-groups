const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Address = require('../models/addresses')

// release 7
// 1. Pada route get '/addresses', tambahkanlah column untuk menampilkan nama contact (jika data contact telah di-assign)
// 2. Pada saat melakukan add di halaman address, tambahkanlah input fields berupa select-option(dropdown/combobox) yang isinya merupakan nama dari semua contact. Sehingga ketika user/client menekan tombol save, data contact akan ke-assign pada data address tersebut
// 3. Pada saat melakukan edit di halaman address, data address harus ter-populate ke masing-masing input form-nya, termasuk selected dropdown-nya

router.get('/addresses',function(req,res){
  let isEdit = false
  Address.findAll().then((dataAddress)=>{
    Contact.findAll().then((dataContact)=>{
      res.render('addresses',{dataAddress,dataContact,isEdit})
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
  Address.create(obj).then((dataAddress)=>{
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
})

//delete contact
router.get('/addresses/delete/:id',function(req,res){
  let id = req.params.id
  Address.remove(id).then((dataAddress)=>{
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
 })

//edit contact get
router.get('/addresses/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  Address.findById(id).then((dataAddress)=>{
    Contact.findAll().then((dataContact)=>{
      res.render('addresses',{dataAddress,dataContact,isEdit})
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
  Address.update(obj).then((dataAddress)=>{
    console.log(obj)
    res.redirect('/addresses')
  }).catch((err)=>{
    console.log(err)
  })
})
module.exports = router
