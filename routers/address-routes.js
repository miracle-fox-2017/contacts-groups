const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const AddressesModel = require('../models/addresses-model');

router.get('/', (req, res) => {
	AddressesModel.findAllDataInnerJoin('Contacts')
		.then((allAddressData) => {
			ContactsModel.findAll()
				.then((allContactsData) => {
					res.render('addresses', { data: allAddressData, contacts: allContactsData });
				})
				.catch(err => res.send(err));
		})
		.catch(err => res.send(err));
});

router.post('/', (req, res) => {
	AddressesModel.create(req.body)
		.then((allAddressData) => {
			res.redirect('/addresses');
		})
		.catch(err => res.send(err));
});

router.get('/edit/:id', (req, res) => {
	let arrModel = [
		AddressesModel.findAllDataInnerJoin('Contacts'), ContactsModel.findAll(),
		AddressesModel.findById({id: req.params.id})
	];

	Promise.all(arrModel)
		.then((allModelData) => {
			let allJoinedContactAddress = allModelData[0];
			let allContactsData = allModelData[1];
			let editedAddressRow = allModelData[2];

			res.render('addresses', { 
				id: req.params.id, data: allJoinedContactAddress, 
				editItem: editedAddressRow, contacts: allContactsData
			});
		})
		.catch(err => res.send(err));
});

router.post('/edit/:id', (req, res) => {
	AddressesModel.update({id: req.params.id, editItem: req.body})
		.then((allAddressData) => {
			res.redirect('/addresses/');
		})
		.catch(err => res.send(err));
});

router.get('/delete/:id', (req, res) => {
	AddressesModel.removeItem({id: req.params.id})
		.then((allAddressData) => {
			res.redirect('/addresses/');
		})
		.catch(err => res.send(err));
});

module.exports = router;