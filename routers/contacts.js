const express  = require('express')
const router   = express.Router()
const contacts = require('../models/contacts')

// CREATE
router.post('/', function(req,res){
  contacts.create(req.body)
  res.redirect('contacts')
})

// READ
router.get('/',function(req,res){
  contacts.findAll(function(err,data_Contacts){
    res.render('contacts',{data_Contacts:data_Contacts})
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  contacts.findById(req.params, function(err,data_Contacts){
    if(!err){
      res.render('contacts-edit',{data_Contacts:data_Contacts})
    }else{
      console.log(err);
    }
  })
})

router.post('/edit/:id', function(req,res){
  contacts.update(req.body, req.params)
  res.redirect('../../contacts')
})

// DELETE
router.get('/delete/:id', function(req,res){
  contacts.reMove(req.params)
  res.redirect('../../contacts')
})

module.exports = router
