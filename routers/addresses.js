const express = require('express')
const Address = require('../models/addresses')

const router = express.Router()

// define the addresses page route
router.get('/', function(req, res) {
  Address.findAll((err, rows) => {
    res.render('addresses/index', {error: err, dataAddresses: rows})
  })
})

router.get('/add', function(req, res) {
  res.render('addresses/add')
})

router.post('/add', function(req, res) {
  Address.create(req.body, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', function(req, res) {
  Address.findById(req.params.id, (err, rows) => {
    res.render('addresses/edit', {error: err, dataAddress: rows})
  })
})

router.post('/edit/:id', function(req, res) {
  Address.update(req.body, req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

router.get('/delete/:id', function(req, res) {
  Address.delete(req.params.id, (err) => {
    if(err) res.send(err)
    res.redirect('/addresses')
  })
})

module.exports = router
