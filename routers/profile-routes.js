const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const ProfilesModel = require('../models/profile-model');

router.get('/', (req, res) => {
	ProfilesModel.findAllDataInnerJoin('Contacts', function(err, allProfiles) {
		ContactsModel.findAll(function(err, allcontacts) {
			res.render('profile', { data: allProfiles, contacts: allcontacts });
		});
	});
});

router.post('/', (req, res) => {
	ProfilesModel.create(req.body, function(err, allProfiles, lastID) {
		if (err === null) {
			res.redirect('/profiles');
		} else {
			res.send(err);
		}
	});
});

router.get('/edit/:id', (req, res) => {
	ProfilesModel.findAllDataInnerJoin('Contacts', function(err, allProfiles) {

		ContactsModel.findAll((err, allContacts) => {
			ProfilesModel.findById({id: req.params.id}, (err, editedRows) =>{
				res.render('profile', { id: req.params.id, data: allProfiles, editItem: editedRows, contacts: allContacts});
			});
		});
	});	
});

router.post('/edit/:id', (req, res) => {
	ProfilesModel.update({id: req.params.id, editItem: req.body},
		function(err, rows) {
			if (err === null) {
				res.redirect('/profiles/');
			} else {
				res.send(err);
			}
		});
});

router.get('/delete/:id', (req, res) => {
	ProfilesModel.removeItem({id: req.params.id}, function(err, rows) {
			if (err === null) {
				res.redirect('/profiles/');
			} else {
				res.send(err);
			}
		});
});

module.exports = router;