const express   = require('express')
const router    = express.Router()
const addresses = require('../models/addresses')
const contacts  = require('../models/contacts')

// CREATE
router.post('/', function(req,res){
  addresses.create(req.body, function(err){
    if(!err){
      res.redirect('addresses')
    }else{
      res.send(err)
    }
  })
})

// READ
router.get('/', function(req,res){
  addresses.findAll(function(err,data_Join){
    contacts.findAll(function(err,data_Contacts){
      res.render('addresses', {data_Addresses:data_Join,data_Contacts:data_Contacts})
    })
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  addresses.findById(req.params,function(err,data_Addresses){
    if(!err){
      contacts.findAll(function(err,data_Contacts){
        if(!err){
          res.render('addresses-edit',{data_Addresses:data_Addresses, data_Contacts:data_Contacts})
        }else{
          console.log(err,'load contacts in profile');
        }
      })
    }else{
      console.log(err,'load Profile by id');
    }
  })
})
router.post('/edit/:id', function(req,res){
  addresses.update(req.body,req.params)
  res.redirect('../../addresses')
})

// DELETE
router.get('/delete/:id', function(req,res){
  addresses.reMove(req.params)
  res.redirect('../../addresses')
})

module.exports = router
