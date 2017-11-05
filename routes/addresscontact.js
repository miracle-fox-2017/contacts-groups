const express = require('express')
const router = express.Router()
const Contact = require('../models/contactsModel')
const Address = require('../models/addressesModel')

router.get('/:id', (req, res)=>{
	Contact.getContactById(req.params.id).then(contact=>{
		Address.getAllAddress().then(addresses=>{
			// res.send({contact, addresses})
			let result = []
			addresses.forEach(address=>{
				if(address.id_contact === contact.id){
					result.push(address)
				}
			})
			res.render('addressesContact', {addresses : result, contact : contact})
		})
	})
})

module.exports = router