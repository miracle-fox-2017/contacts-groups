const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const ProfilesModel = require('../models/profile-model');

router.get('/', (req, res) => {
	ProfilesModel.findAllDataInnerJoin('Contacts')
		.then((allProfiles) => { 
			ContactsModel.findAll().then((allContacts) => {
				res.render('profile', { data: allProfiles, contacts: allContacts });
			}).catch((err) => {
				res.send(err)
			}); 
		})
		.catch((err) => {
			res.send(err)
		})
});

router.post('/', (req, res) => {
	ProfilesModel.create(req.body)
		.then(function(success) {
			res.redirect('/profiles');
		})
		.catch(function(error){
			res.send(error);
		});
});

router.get('/edit/:id', (req, res) => {
	let arrModel = [
		ProfilesModel.findAllDataInnerJoin('Contacts'),
		ContactsModel.findAll(),
		ProfilesModel.findById({id: req.params.id})
	];

	Promise.all(arrModel)
		.then(function(success) {
			res.render('profile', { id: req.params.id, data: success[0], editItem: success[2], contacts: success[1]});
		})
		.catch(function(error) {
			res.send(error);
		})
});

router.post('/edit/:id', (req, res) => {
	ProfilesModel.update({id: req.params.id, editItem: req.body})
		.then((success) => {
			res.redirect('/profiles/');
		})
		.catch((error) => {
			res.send(error);
		})
});

router.get('/delete/:id', (req, res) => {
	ProfilesModel.removeItem({id: req.params.id})
		.then((success) => {
			res.redirect('/profiles/');
		})
		.catch((err) => {
			res.send(err);
		})
});

module.exports = router;