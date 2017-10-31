const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const ProfilesModel = require('../models/profile-model');

router.get('/', (req, res) => {
	ProfilesModel.findAllDataInnerJoinPromise('Contacts')
		.then((allProfiles) => { 
			ContactsModel.findAllPromise().then((allContacts) => {
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
	ProfilesModel.createPromise(req.body)
		.then(function(success) {
			res.redirect('/profiles');
		})
		.catch(function(error){
			res.send(error);
		});
});

router.get('/edit/:id', (req, res) => {
	let arrModel = [
		ProfilesModel.findAllDataInnerJoinPromise('Contacts'),
		ContactsModel.findAllPromise(),
		ProfilesModel.findByIdPromise({id: req.params.id})
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
	ProfilesModel.updatePromise({id: req.params.id, editItem: req.body})
		.then((success) => {
			res.redirect('/profiles/');
		})
		.catch((error) => {
			res.send(error);
		})
});

router.get('/delete/:id', (req, res) => {
	ProfilesModel.removeItemPromise({id: req.params.id})
		.then((success) => {
			res.redirect('/profiles/');
		})
		.catch((err) => {
			res.send(err);
		})
});

module.exports = router;