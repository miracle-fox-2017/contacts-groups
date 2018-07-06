const express   = require('express')
const router    = express.Router()
const profile   = require('../models/profile')
const groups    = require('../models/groups')
const contacts  = require('../models/contacts')
const addresses = require('../models/addresses')


// READ
router.get('/',function(req,res){
  Promise.all(
    [
      profile.findAll(),
      groups.findAll(),
      contacts.findAll(),
      addresses.findAll()
    ]).then(alldata =>{
      res.render('index',{data_Profile:alldata[0], data_Groups:alldata[1], data_Contacts:alldata[2], data_Addresses:alldata[3]})
    }).catch(err =>{
      console.log(err,'promise all');
    })
})


module.exports = router
