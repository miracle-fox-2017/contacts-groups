const express = require('express')
const router = express.Router()
const Contacts = require('../models/contacts')

router.get('/', (req, res) => {
  Contacts.getAll(contactsData => {
    res.render('contacts', {title:'Contacts', contacts:contactsData})
  })
})

function addRender(req,res,err){
  res.render('contacts/add', {title:'Add Contact', err:err})
}

router.get('/add', (req, res) => {
  addRender(req,res)
})

router.post('/add', (req, res) => {
  Contacts.create(req.body, err => {
    if(err){
      addRender(req,res,err);
    }else{
      res.redirect('/contacts')
    }
  })
})

router.get('/edit/:id', (req, res) => {
  Contacts.getOne(req.params.id, contact => {
    res.render('contacts/edit', {title:'Edit Contact', contact:contact});
  })
})

router.post('/edit/:id', (req, res) => {
  Contacts.update(req.body, req.params.id)
  res.redirect('/contacts')
})

router.get('/delete/:id', (req, res) => {
  Contacts.destroy(req.params.id)
  res.redirect('/contacts')
})

module.exports = router;
