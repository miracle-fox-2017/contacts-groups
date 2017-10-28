const express = require('express')
const Contact = require('../models/contacts')

const router = express.Router()

// define the home page route
router.get('/', function(req, res) {
  Contact.findAll((err, rows) => {
    if(err) {
      console.log(err)
    } else {
      console.log(rows)
    }
  })
})

// router.get('/add', (req, res) => {
  // res.render('contacts/add')
// })

// router.post('/add', (req, res) => {
  // Contacts.create(err => {
    // res.send(req.body)
    // res.redirect('/contacts')
  // })
// })

module.exports = router
