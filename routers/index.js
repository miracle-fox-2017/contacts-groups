const express = require('express')
const Index = require('../models/index')

const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.render('index', {title: 'My Contacts App'})
})

router.get('/addresses_with_contact', function(req, res) {
  Index.addressWithContact().then((dataAddressesWithContact) => {
    res.render('addresses_with_contact', {title: 'My Contacts App | Addresses With Contact', dataAddresses: dataAddressesWithContact})
  })
})

module.exports = router
