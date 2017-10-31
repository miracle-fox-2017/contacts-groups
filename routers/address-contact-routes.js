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

router.get('/:id', (req, res) => {
	let idContact = req.params.id;

	let arrModel = [
		ContactsModel.findById({id: idContact}),
		AddressesModel.findAll()
	]


	Promise.all(arrModel).then((allModelData) => {
		let allAddressData = allModelData[1];
		let contactById = allModelData[0];


		let arrAddress = [];

		allAddressData.forEach( function(address, index) {
			if (address.contacts_id == idContact) {
				arrAddress.push(address);
			}
		});


		res.render('address-with-contact', {contact: contactById, allAddress: arrAddress});
	})
	.catch(err => res.send(err));
});

module.exports = router;