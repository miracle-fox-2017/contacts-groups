const express = require('express')
const router = express.Router()
const Addresses = require('../models/address')
const Contact = require('../models/contact')


router.get('/', (req, res)=>{
	Addresses.findAll().then(addresses=>{
		Contact.findAll().then(contacts=>{
			res.render('addresses/addresses_with_contact', {addresses, contacts})
		})
	})
})

module.exports = router