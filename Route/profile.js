const express = require('express')
const bodyParser = require('body-parser')
const Profile = require('../Model/profile');

var route = express.Router()

route.get('/',(req,res)=>{
  Profile.gettable('Contacts',rowstable =>{
    Profile.getall(rows=>{
      // res.send({profile : rows,contact :rowstable})
      res.render('profile',{profile : rows,contact :rowstable})
    })
  })
})

route.post('/',(req,res)=>{
  if (req.body.username.length === 0){
    res.render('profile',{error:["Error namasudah ada"]})
  }
  else {
  let profile ={
    username : req.body.username,
    password   : req.body.password,
    contactid : req.body.contact_id
  }
  // res.send(profile)
  Profile.addnew(profile)
  res.redirect('/profile')
}
})

route.get('/edit/:id',(req,res)=>{
  Profile.gettable('Contacts',rowstable =>{
    Profile.edit(req.params.id,row=>{
      // res.send(row)
      res.render('profileEdit',{rowProfile:row,contact :rowstable})
    })
  })
})

route.post('/edit/:id',(req,res) =>{
    let id = req.params.id
    let update = {
      username : req.body.username,
      password : req.body.password,
      contactid : req.body.contact_id
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
