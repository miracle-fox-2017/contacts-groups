const express = require('express')
const router = express.Router()
const Address = require('../models/addresses')
const Contact = require('../models/contacts')

router.get('/', (req, res) => {
  Address.getAll().then(addressesData => {
    res.render('addresses', {title:'Addresses', addresses:addressesData})
  }).catch(err => {
    res.send(err)
  })
})

router.get('/add', (req, res) => {
  Contact.getAll().then(contactsData => {
    res.render('addresses/add', {title:'Add Address', contacts:contactsData})
  })
})

router.post('/add', (req, res) => {
  Address.create(req.body).then(() => {
    res.redirect('/addresses')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/edit/:id', (req, res) => {
  Promise.all([
    Address.getOne(req.params.id),
    Contact.getAll()
  ]).then(rows => {
    res.render('addresses/edit', {title:'Edit Address', address:rows[0], contacts:rows[1]});
  }).catch(err => {
    res.send(err)
  })
})

router.post('/edit/:id', (req, res) => {
  Address.update(req.body, req.params.id).then(() => {
    res.redirect('/addresses')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/delete/:id', (req, res) => {
  Address.destroy(req.params.id).then(() => {
    res.redirect('/addresses')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router;
