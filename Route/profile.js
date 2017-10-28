const express = require('express')
const bodyParser = require('body-parser')
const Profile = require('../Model/profile');

var route = express.Router()

route.get('/',(req,res)=>{
  Profile.getall(rows=>{
    res.render('profile',{profile : rows})
  })
})

route.post('/',(req,res)=>{
  let profile ={
    username : req.body.username,
    password   : req.body.password
  }
  Profile.addnew(profile)
  res.redirect('/profile')
})

route.get('/edit/:id',(req,res)=>{
  Profile.edit(req.params.id,row=>{
    res.render('profileEdit',{rowProfile:row})
  })
})

route.post('/edit/:id',(req,res) =>{
    let id = req.params.id
    let update = {
      username : req.body.username,
      password : req.body.password,
    }
    // res.send(update)
    Profile.update(id,update)
    res.redirect('/profile')
})

route.get('/delete/:id',(req,res)=>{
  Profile.addDelete(req.params.id)
  res.redirect('/profile')
})


module.exports = route;
