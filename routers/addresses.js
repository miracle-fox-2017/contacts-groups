const express   = require('express')
const router    = express.Router()
const addresses = require('../models/addresses')
const contacts  = require('../models/contacts')

// CREATE
router.post('/', function(req,res){
  addresses.create(req.body).then(()=>{
    res.redirect('addresses')
  }).catch((err)=>{
    console.log(err,'insert into Addresses');
  })
})

// READ
router.get('/', function(req,res){
  addresses.findAll().then((data_Join)=>{
    contacts.findAll().then((data_Contacts)=>{
      res.render('addresses', {data_Addresses:data_Join, data_Contacts:data_Contacts})
    }).catch((err)=>{
      console.log(err,'findAll contacts in Addresses');
    })
  }).catch((err)=>{
    console.log(err,'findAll Addresses');
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  addresses.findById(req.params).then((data_Addresses)=>{
    contacts.findAll().then((data_Contacts)=>{
      res.render('addresses-edit',{data_Addresses:data_Addresses, data_Contacts:data_Contacts})
    }).catch((err)=>{
      console.log(err,'findAll contacts in Addresses');
    })
  }).catch((err)=>{
    console.log(err,'findById from Addresses');
  })
})

router.post('/edit/:id', function(req,res){
  addresses.update(req.body,req.params).then(()=>{
    res.redirect('../../addresses')
  }).catch((err)=>{
    console.log(err,'update from Addressses');
  })

})

// DELETE
router.get('/delete/:id', function(req,res){
  addresses.reMove(req.params).then(()=>{
    res.redirect('../../addresses')
  }).catch((err)=>{
    console.log(err,'delete from Addresses');
  })

})

module.exports = router
