const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const AddressesModel = require('../models/addresses-model');

router.get('/', (req, res) => {
	let arrModel = [
		AddressesModel.findAll(),
		ContactsModel.findAll()
	];

	Promise.all(arrModel).then((allModelData) => {
		let allAddressData = allModelData[0];
		let allContactsData = allModelData[1];

		 res.render('addresses-contact', { data: allAddressData, contacts: allContactsData, joinedData: ContactsModel.findAllJoinContactsAddresses(allAddressData, allContactsData)});
	})
	.catch(err => res.send(err));
});

module.exports = router;