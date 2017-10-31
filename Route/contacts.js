const express = require('express')
const bodyParser = require ('body-parser')
const sqlite3 = require('sqlite3').verbose();
const Contacts = require('../Model/contacts')
const Groups = require ('../Model/groups')
const GroupContact = require('../Model/groupcontact');
const Address = require('../Model/address');

const db = new sqlite3.Database('./database/person.db')

var route = express.Router()


route.get('/',(req,res)=>{
  Contacts.getall().then(rows =>{
     GroupContact.gettable().then(rowgroups=>{

       res.render('contacts',{contact : rows,groups:rowgroups,error:[]})
    })
    // console.log(rows);
    // res.send(rows)

  // db.all(`SELECT * FROM Contacts`,(err,rows)=>{
  //   console.log(rows);
    // res.render('contacts',{contact : rows})
  })
})

route.post('/',(req,res)=>{
  if (req.body.name === "" || req.body.company === "" || req.body.telp === "" || req.body.email === ""){
        // res.send({profile : rows,contact :rowstable,error:["Error namasudah ada"]})
    Contacts.getall().then(rows =>{
       Groups.getall().then(rowgroups=>{
         res.render('contacts',{contact : rows,groups:rowgroups,error:['Error Semua Field Tidak Boleh Kosong']})
       })
    })
  }
  else {
  let add ={
    nama : req.body.name,
    company: req.body.company,
    telp:req.body.telp,
    email :req.body.email

  }
    Contacts.addnew(add).then(data => {
    GroupContact.addnew(req.body.groupcontact,data.lastID)
      // res.send(data)
    res.redirect('/contacts')
    })
  }
  // res.redirect('/contacts')
})

route.get('/edit/:id',(req,res) =>{
  Contacts.edit(req.params.id).then(row =>{
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

route.get('/address/:id',(req,res)=>{
  // res.send('hkhkhk')
  Contacts.findbyid(req.params.id).then(row =>{
    Address.findbyid(req.params.id).then(data=>{
      // res.send({contact : row, Address :data})
      res.render('Contactaddres',{contact : row, Address :data})

    })

  })
})

route.post('/address/:id',(req,res)=>{
  let add = {
      street : req.body.street,
      city : req.body.city,
      zipcode : req.body.zipcode,
      contactid : req.params.id
  }
  Address.addnew(add)
  res.redirect('/contacts')
})

module.exports = route;
