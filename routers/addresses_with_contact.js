const express = require ('express');
const router  = express.Router();

const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

router.get('/', function(req, res){
	Address.findAll()
	.then(rowAddress =>{
		rowAddress.forEach((data, index) =>{
			Contact.findById(data.contact_id)
			.then(contactAddress =>{
				data['contact'] = contactAddress;
				if(index == rowAddress.length-	1){
					res.render('addresses_with_contact', {address : rowAddress})
				}
			})
		})
	})
	.catch(err =>{
		res.send(err)
	})
})	

module.exports = router				