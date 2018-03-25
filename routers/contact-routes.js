const express = require('express');
const router = express.Router();

const ContactsModel = require('../models/contacts-model');
const GroupsModel = require('../models/groups-model');
const ContactsGroupsModel = require('../models/contacts-groups-model');

let contact = new ContactsModel('./database/database.db');
let group = new GroupsModel('./database/database.db');
let contactGroup = new ContactsGroupsModel();

router.get('/', (req, res) => {
	let arrModel = [
		ContactsModel.findAll(), GroupsModel.findAll(), GroupsModel.findAllInnerJoin('Contacts_Groups', 'Groups')
	];

	Promise.all(arrModel).then(function(allModelData) {
		res.render('contacts', {
			groups: allModelData[1], 
			contacts_groups: ContactsModel.findAllJoinContactsGroups(allModelData[0], allModelData[2])
		});
	}).catch(function(err) {
		res.send(err);
	})
});

router.post('/', (req, res) => {
	ContactsModel.create(req.body).then((allContact) => {
		ContactsGroupsModel.create({contacts_id: allContact.lastID, groups_id: +req.body.groups_id})
			.then((allContactsGroups) => {
				res.redirect('/contacts');
			})
			.catch((err) => res.send(err));
		
	}).catch((err) => {
		res.send(err);
	});
});

router.get('/edit/:id', (req, res) => {
	let arrModel = [
		ContactsModel.findAll(), GroupsModel.findAll(),
		GroupsModel.findAllInnerJoin('Contacts_Groups', 'Groups'), ContactsModel.findById({id: req.params.id}),
	]

	Promise.all(arrModel)
		.then(function(allModelData) {
			res.render('contacts', {
				groups: allModelData[1], 
				contacts_groups: ContactsModel.findAllJoinContactsGroups(allModelData[0], allModelData[2]), 
				id: req.params.id, editItem: allModelData[3] 
			});

		}).catch(function(error) {
			res.send(error);
		})
});

router.post('/edit/:id', (req, res) => {
	ContactsModel.update({id: req.params.id, editItem: req.body})
		.then((allContactData) => {
			ContactsGroupsModel.create({contacts_id: req.params.id, groups_id: +req.body.groups_id})
				.then(function(allContactGroups) {
					res.redirect('/contacts');
				})
				.catch(function(err) {
					res.send(err);
				})
			
		}).catch((err) => {
			res.send(err);
		})
});

router.get('/delete/:id', (req, res) => {
	ContactsModel.removeItem({id: req.params.id})
		.then(() => {
			res.redirect('/contacts');
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = router;