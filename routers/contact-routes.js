const express = require('express');
const router = express.Router();

const ContactsModel = require('../models/contacts-model');
const GroupsModel = require('../models/groups-model');
const ContactsGroupsModel = require('../models/contacts-groups-model');

let contact = new ContactsModel('./database/database.db');
let group = new GroupsModel('./database/database.db');
let contactGroup = new ContactsGroupsModel();

router.get('/', (req, res) => {
	ContactsModel.findAll(function(err, allContacts) {
		if (err === null) {
			GroupsModel.findAll(function(err, allgroups) {
				GroupsModel.findAllInnerJoin('Contacts_Groups', 'Groups', (err, allcontactgroups) => {
					res.render('contacts', {groups: allgroups, contacts_groups: ContactsModel.findAllJoinContactsGroups(allContacts, allcontactgroups)});
				})
			})
		} else {
			res.send(err);
		}
	});
});

router.post('/', (req, res) => {
	ContactsModel.create(req.body, function(err, data, lastContactId) {
		ContactsGroupsModel.create({contacts_id: lastContactId, groups_id: +req.body.groups_id});
		res.redirect('/contacts');
	});
});

router.get('/edit/:id', (req, res) => {
	ContactsModel.findAll(function(err, allcontacts) {
		GroupsModel.findAll((err, allgroups) => {
			GroupsModel.findAllInnerJoin('Contacts_Groups', 'Groups', (err, allcontactgroups) => {
				ContactsModel.findById({id: req.params.id}, (err, editedRows) =>{
					res.render('contacts', {
						groups: allgroups, 
						contacts_groups: ContactsModel.findAllJoinContactsGroups(allcontacts, allcontactgroups), 
						id: req.params.id, editItem: editedRows 
					});
				});
			});
		});
	});	
});

router.post('/edit/:id', (req, res) => {
	ContactsModel.update({id: req.params.id, editItem: req.body}, function(err, rows, lastContactId) {
		if (err === null) {
			ContactsGroupsModel.create({contacts_id: req.params.id, groups_id: +req.body.groups_id})
			res.redirect('/contacts');
		} else {
			res.send(err);
		}
	});
});

router.get('/delete/:id', (req, res) => {
	ContactsModel.removeItem({id: req.params.id}, function(err, rows, obj) {
		if (err === null) {
			res.redirect('/contacts');
		} else {
			res.send(err);
		}
	});
});

module.exports = router;