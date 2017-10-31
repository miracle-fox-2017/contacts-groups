
const express = require('express');
const router = express.Router();

const Profile = require('../models/profile')


router.get('/profile',function(req,res){
  let edit = false;
  Profile.findAll(function(err,rowProfile){
    if(!err){
                res.render('profile',{rowProfile, edit})
            }
         })
     })


router.post('/profile',function(req,res){
  let edit = false;
  let obj = {username:req.body.username,
             password:req.body.password}
     Profile.create(obj,function(err,rowProfile){
    if(!err){
      res.redirect('profile')
    }
  })
})


router.get('/profile/delete/:id',function(req,res){
    Profile.remove(req.params.id, function() {
    res.redirect('/profile')
  })    
})

router.get('/profile/edit/:id',function(req,res){
  let request = {params: req.params.id};
  let edit = true;

  Profile.Update(request, (err, rowProfile)=>{
    if(err){console.log(err)}
    console.log(rowProfile);
    res.render('profile', {rowProfile:rowProfile, edit:true})
  })
})

router.post('/profile/edit/:id', function(req,res){
  let Obj = {
    id : req.params.id,
    username : req.body.username,
    password : req.body.password,
  }

  Profile.EditPost(Obj,(err,rowProfile)=>{
    if(!err){console.log(err)}
    res.redirect('/profile')
  })
})

module.exports = router
