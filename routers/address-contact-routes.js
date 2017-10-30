const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const AddressesModel = require('../models/addresses-model');

router.get('/', (req, res) => {
	AddressesModel.findAll(function(err, allAddress) {
		ContactsModel.findAll((err, allContacts) => {
			console.log({ data: allAddress, contacts: allContacts, joinedData: ContactsModel.findAllJoinContactsGroups(allAddress, allContacts)});

			res.render('addresses-contact', { data: allAddress, contacts: allContacts, joinedData: ContactsModel.findAllJoinContactsAddresses(allAddress, allContacts)});
		});
	});
});

module.exports = router;