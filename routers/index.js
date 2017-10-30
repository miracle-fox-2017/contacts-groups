const express   = require('express')
const router    = express.Router()
const profile   = require('../models/profile')
const groups    = require('../models/groups')
const contacts  = require('../models/contacts')
const addresses = require('../models/addresses')


// READ
router.get('/',function(req,res){
  profile.findAll(function(err,data_join){
    if(!err){
      groups.findAll(function(err,data_Groups){
        if(!err){
          contacts.findAll(function(err,data_Contacts){
            if(!err){
              addresses.findAll(function(err,data_Addresses){
                if(!err){
                  res.render('index',{data_Profile:data_join, data_Groups:data_Groups, data_Contacts:data_Contacts, data_Addresses:data_Addresses})
                }else{
                  console.log(err,'load from Addresses');
                }
              })
            }else{
              console.log(err,'load from Contacts');
            }
          })
        }else{
          console.log(err,'load from Groups');
        }
      })
    }else{
      console.log(err,'load from Profile');
    }
  })
})


module.exports = router
