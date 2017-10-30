const express = require ('express');
const router  = express.Router();

const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

router.get('/', function(req, res){
	Contact.findAll(function(err,rowContact){
		rowContact.forEach((data, index) =>{
			Address.findByContact(data.id,function (err, address){
				data['address'] = address
				if(index == rowContact.length -1){
					res.render('addresses_with_contact', {contact : rowContact})
				}
			})
		})
	})
})	

module.exports = router				