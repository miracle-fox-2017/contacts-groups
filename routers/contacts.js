const express  = require('express')
const router   = express.Router()
const groups   = require('../models/groups')
const contacts = require('../models/contacts')
const contacts_groups = require('../models/contacts_groups')

// CREATE
router.post('/', function(req,res){
  contacts.create(req.body)
  res.redirect('contacts')
})

// READ
router.get('/',function(req,res){
  contacts.findAll(function(err,data_Contacts){
    if(!err){
      contacts_groups.findAll(data_Contacts,function(err,data_contacts_groups){
        if(!err){
          // console.log(data_contacts_groups);
          if(data_contacts_groups){
            groups.findAll(function(err,data_Groups){
              if(!err){
                res.render('contacts',{data_contacts_groups:data_contacts_groups, data_Contacts:data_Contacts,data_Groups:data_Groups})
              }else{
                console.log(err,'err load group in contact');
              }
            })
          }
        }else{
          console.log(err,'load conjunction');
        }
      })
    }else{
      console.log(err,'load data Contacts');
    }
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
