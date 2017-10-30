const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const AddressesModel = require('../models/addresses-model');

router.get('/', (req, res) => {
	AddressesModel.findAllDataInnerJoin('Contacts', function(err, allAddress) {

		ContactsModel.findAll((err, allContacts) => {
			res.render('addresses', { data: allAddress, contacts: allContacts });
		});
	});
});

router.post('/', (req, res) => {
	AddressesModel.create(req.body, function(err, allAddress, lastId) {
		if (err == null) {
			res.redirect('/addresses');
		} else {
			res.send(err);
		}
	});
});

router.get('/edit/:id', (req, res) => {
	AddressesModel.findAllDataInnerJoin('Contacts', function(err, allAddressJoined) {
		ContactsModel.findAll((err, allContacts) => {
			AddressesModel.findById({id: req.params.id}, (err, editedRows) =>{
				res.render('addresses', { id: req.params.id, data: allAddressJoined, editItem: editedRows, contacts: allContacts});
			});
		});
	});	
});

router.post('/edit/:id', (req, res) => {
	AddressesModel.update({id: req.params.id, editItem: req.body}, function(err, allAddress, lastId) {
		if (err == null) {
			res.redirect('/addresses/');
		} else {
			res.send(err);
		}
	});
});

router.get('/delete/:id', (req, res) => {
	AddressesModel.removeItem({id: req.params.id}, function(err, allAddress, lastId) {
		if (err == null) {
			res.redirect('/addresses/');
		} else {
			res.send(err);
		}
	});
});

module.exports = router;