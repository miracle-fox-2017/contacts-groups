const express = require('express')
const bodyParser = require('body-parser')
const Profile = require('../Model/profile');
const Contact = require ('../Model/contacts')

var route = express.Router()

route.get('/',(req,res)=>{
  Contact.getall().then(rowstable =>{
     Profile.getall().then(rows=>{
      // res.send({profile : rows,contact :rowstable})
       res.render('profile',{profile : rows,contact :rowstable,error:[]})
    })
  })
})

route.post('/',(req,res)=>{
  if (req.body.username === ""){
        // res.send({profile : rows,contact :rowstable,error:["Error namasudah ada"]})
    Contact.getall().then(rowstable =>{
       Profile.getall().then(rows=>{
         res.render('profile',{profile : rows,contact :rowstable,error:["Error Username / Password Tidak Boleh Kosong"]})
      })
    })
  }
  else {
  let profile ={
    username : req.body.username,
    password   : req.body.password,
    contactid : req.body.contact_id
  }
  // res.send(profile)
  Profile.addnew(profile).then(call =>{
    if(call != null){
      Contact.getall().then(rowstable =>{
         Profile.getall().then(rows=>{
          res.render('profile',{profile : rows,contact :rowstable,error:["Error Nama Telah Digunakan"]})
        })
      })
    }
    else {
      res.redirect('/profile')
    }
  })
  // res.redirect('/profile')
}

})

route.get('/edit/:id',(req,res)=>{
  Contact.getall().then(rowstable =>{
     Profile.edit(req.params.id).then(row=>{
      // res.send(rowstable[0])
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
