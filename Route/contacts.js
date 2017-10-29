const express = require('express')
const bodyParser = require ('body-parser')
const sqlite3 = require('sqlite3').verbose();
const Contacts = require('../Model/contacts')

const db = new sqlite3.Database('./database/person.db')

var route = express.Router()


route.get('/',(req,res)=>{
  Contacts.getall((rows) =>{
    // console.log(rows);
    // res.send(rows)

  // db.all(`SELECT * FROM Contacts`,(err,rows)=>{
  //   console.log(rows);
    res.render('contacts',{contact : rows})
  })
})

route.post('/',(req,res)=>{
  let add ={
    nama : req.body.name,
    company: req.body.company,
    telp:req.body.telp,
    email :req.body.email

  }
  Contacts.addnew(add)
  res.redirect('/contacts')
})

route.get('/edit/:id',(req,res) =>{
  Contacts.edit(req.params.id,row =>{
    res.render('contactsEdit',{rowContact:row})
  })
})

route.post('/edit/:id',(req,res) =>{
    let id = req.params.id
    let update = {
      name    : req.body.nama,
      company : req.body.company,
      telp    : req.body.telp,
      email   : req.body.email
    }
    // res.send(update)
    Contacts.update(id,update)
    res.redirect('/contacts')
})

route.get('/delete/:id',(req,res)=>{
  Contacts.addDelete(req.params.id)
  res.redirect('/contacts')
})


module.exports = route;
