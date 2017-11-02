const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts')
const Profile = require('../models/profiles')
//menampilkan profile
router.get('/profiles',function(req,res){
  let isEdit = false
  let errMess = ""
  Profile.findAll().then((profilesRows)=>{
    Contact.findAll().then((contactsRows)=>{
      res.render('profiles',{profilesRows,contactsRows,isEdit,errMess})
    }).catch((err)=>{
      console.log(err)
    })
  })
})
//menambahkan profile
router.post('/profiles',function(req,res){
  let isEdit = false;
  let errMess = "Your contact already have profile"
  let obj = {username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.create(obj).then((profilesRows)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    if(err.code = 'SQLITE_CONSTRAINT'){
      //let alreadyUsed = true;
      Profile.findAll().then((profilesRows)=>{
        Contact.findAll().then((contactsRows)=>{
          res.render('profiles',{profilesRows,contactsRows,isEdit,errMess})
        }).catch((err)=>{
          console.log(err)
        })
      })
    }
  })
})
//delete profile
router.get('/profiles/delete/:id',function(req,res){
  let id = req.params.id
  Profile.delete(id).then((profilesRows)=>{
    res.redirect('/profiles')
  }).catch((err)=>{
    console.log(err)
  })
 })
//edit profile get
router.get('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let id = req.params.id;
  let errMess = ''
  Profile.findById(id).then((profilesRows)=>{
    Contact.findAll().then((contactsRows)=>{
      res.render('profiles',{profilesRows,contactsRows,isEdit,errMess})
    }).catch((err)=>{

    })
  })
})
//edit profile post
router.post('/profiles/edit/:id',function(req,res){
  let isEdit = true;
  let errMess = ""
  let obj = {id:req.params.id,
             username:req.body.username,
             password:req.body.password,
             contacts_id:req.body.contact}
  Profile.update(obj).then((profilesRows)=>{
    res.redirect('/profiles')
  }).catch((err)=>{

  })
})

module.exports = router
