const express = require('express')
const router = express.Router()
const Addresses = require('../models/address')
const Contact = require('../models/contact')


router.get('/', (req, res)=>{
	Addresses.read(address=>{
		Contact.read(contacts=>{
			res.render('addresses/addresses_with_contact', {addresses : address, contacts})
		})
	})
})

module.exports = router