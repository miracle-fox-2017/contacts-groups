const express = require('express')
const bodyParser = require('body-parser')
const Groups = require('../Model/groups');

var route = express.Router()

route.get('/',(req,res)=>{
  Groups.getall().then(rows=>{
     res.render('groups',{group : rows})
  })
})

route.post('/',(req,res)=>{
  let group ={
    nama : req.body.nama
  }
  Groups.addnew(group)
  res.redirect('/groups')
})

route.get('/edit/:id',(req,res)=>{
  Groups.edit(req.params.id).then(row=>{
    res.render('groupEdit',{rowGroup:row})
  })
})

route.post('/edit/:id',(req,res) =>{
    let id = req.params.id
    let update = {
      name    : req.body.nama,
    }
    // res.send(update)
    Groups.update(id,update)
    res.redirect('/groups')
})

route.get('/delete/:id',(req,res)=>{
  Groups.addDelete(req.params.id)
  res.redirect('/groups')
})


module.exports = route;
