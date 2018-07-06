const express   = require('express')
const router    = express.Router()
const profile   = require('../models/profile')
const contacts  = require('../models/contacts')

//CREATE
router.post('/', function(req,res){
  profile.create(req.body).then(()=>{
    res.redirect('profile')
  }).catch((err)=>{
    res.redirect('profile/?error=true')
  })
})

// READ
router.get('/', function(req,res){
  let error = ''
  if(req.query.hasOwnProperty('error')){
    error = "Your contact already have profile"
  }
  profile.findAll().then((data_join)=>{
    contacts.findAll().then((data_Contacts)=>{
      res.render('profile',{pesanError:error, data_Profile:data_join, data_Contacts:data_Contacts})
    }).catch((err)=>{
      console.log(err,'findAll Contacts in profile');
    })
  }).catch((err)=>{
    console.log(err,'data join from profile');
  })
})

// UPDATE
router.get('/edit/:id', function(req,res){
  profile.findById(req.params).then((data_Profile)=>{
    contacts.findAll().then((data_Contacts)=>{
      res.render('profile-edit',{data_Profile:data_Profile, data_Contacts:data_Contacts})
    }).catch((err)=>{
      console.log(err,'update findAll Contacts in Addresses');
    })
  }).catch((err)=>{
    console.log(err,'findById from Profile');
  })
})

router.post('/edit/:id', function(req,res){
  profile.update(req.body,req.params).then(()=>{
    res.redirect('../../profile')
  }).catch((err)=>{
    console.log(err,'update from Profile');
  })

})

// DELETE
router.get('/delete/:id',function(req,res){
  profile.reMove(req.params).then(()=>{
    res.redirect('../../profile')
  }).catch((err)=>{
    console.log(err,'delete from Profile');
  })

})

module.exports = router
