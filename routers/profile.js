const express   = require('express')
const router    = express.Router()
const profile   = require('../models/profile')
const contacts  = require('../models/contacts')

//CREATE
router.post('/', function(req,res){
  profile.create(req.body, function(err){
    if(!err){
      res.redirect('profile')
    }else{
      res.redirect('profile/?error=true')
    }
  })
})

// READ
router.get('/', function(req,res){
  let error = ''
  if(req.query.hasOwnProperty('error')){
    error = "Your contact already have profile"
  }
  profile.findAll(function(err,data_join){
    contacts.findAll(function(err,data_Contacts){
      res.render('profile',{pesanError:error, data_Profile:data_join, data_Contacts:data_Contacts})
    })
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  profile.findById(req.params, function(err,data_Profile){
    if(!err){
      contacts.findAll(function(err,data_Contacts){
        if(!err){
          res.render('profile-edit',{data_Profile:data_Profile, data_Contacts:data_Contacts})
        }else{
          console.log(err,'failed load contacts in get profile');
        }
      })
    }else{
      console.log(err,'failed load Profile by id');
    }
  })
})

router.post('/edit/:id', function(req,res){
  profile.update(req.body,req.params)
  res.redirect('../../profile')
})

// DELETE
router.get('/delete/:id',function(req,res){
  profile.reMove(req.params)
  res.redirect('../../profile')
})

module.exports = router
