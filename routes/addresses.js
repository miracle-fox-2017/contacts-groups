const express = require('express')
const router = express.Router()
const Addresses = require('../models/addresses')

function getdata(){
  var faker = require('faker');

  var randomStreet = faker.address.streetName(); // Rowan Nikolaus
  var randomCity = faker.address.city(); // Kassandra.Haley@erich.biz
  var randomZipcode = faker.address.zipCode(); // random contact card containing many properties

  let obj = {
    street:randomStreet,
    city:randomCity,
    zipcode:randomZipcode
  }

  return obj
}

router.get('/', (req, res) => {
  Addresses.getAll(addressesData => {
    res.render('addresses', {title:'Addresses', addresses:addressesData})
  })
})

router.get('/add', (req, res) => {
  res.render('addresses/add', {title:'Add Address', dummy:getdata()})
})

router.post('/add', (req, res) => {
  Addresses.create(req.body)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res) => {
  Addresses.getOne(req.params.id, address => {
    res.render('addresses/edit', {title:'Edit Address', address:address});
  })
})

router.post('/edit/:id', (req, res) => {
  Addresses.update(req.body, req.params.id)
  res.redirect('/addresses')
})

router.get('/delete/:id', (req, res) => {
  Addresses.destroy(req.params.id)
  res.redirect('/addresses')
})

module.exports = router;
