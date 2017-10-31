const express = require('express');
const router = express.Router();

//require FILE models
const Profile = require('../models/profile');



// //Menampilkan semua data profiles
// router.get('/profiles',function(req,res){
//   Profile.findAll(function(rowProfiles){
//     res.render('profiles',{rowProfiles})
//   })
// })
//Menampilkan semua data profiles
router.get('/profiles',function(req,res){
  Profile.findAllwithContact(function(rowProfiles){
    res.render('profiles',{rowProfiles})
  })
})
// Menerima data form untuk input profile
router.post('/profiles',function(req,res){
  Profile.inputProfile(req.body)
  res.redirect('/profiles')
})
//Menampilkan data profile spesifik untuk diubah
router.get('/profiles/edit/:id',function(req,res){
  Profile.findProfile(req.params.id,function(rowProfiles){
    res.render('editprofiles',{rowProfiles})
  })
})
//Menerima data form untuk update profile
router.post('/profiles/edit/:id',function(req,res){
  Profile.editProfile(req.params.id,req.body)
  res.redirect('/profiles')
})
//Menghapus data profile berdasarkan id
router.get('/profiles/delete/:id',function(req,res){
  Profile.deleteProfile(req.params.id)
    res.redirect('/profiles')
})

module.exports=router
