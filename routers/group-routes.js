const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const GroupsModel = require('../models/groups-model');
const ContactsGroupsModel = require('../models/contacts-groups-model');

router.get('/', (req, res) => {
	GroupsModel.findAll(function(err, allGroups) {
		if (err == null) {
			ContactsModel.findAll(function(err, allContacts) {
				ContactsGroupsModel.findAll(function(err, allContactGroup) {	
					
					let arrJoinedGroups = [];

					allGroups.forEach( function(group) {
						let obj = {};
						obj.id = group.id;
						obj.name_of_group = group.name_of_group;
						obj.contacts_name = [];

						allContacts.forEach( function(contact) {
							allContactGroup.forEach( function(item) {
								if (group.id == item.groups_id && contact.id == item.contacts_id) {
									obj.contacts_name.push(contact.name);
								}
							});
						});

						arrJoinedGroups.push(obj);
					});


					res.render('groups', {data: allGroups, joinedGroups:arrJoinedGroups });
				});
			});
			
		} else {
			res.send(err);
		}
	});
});

router.post('/', (req, res) => {
	GroupsModel.create(req.body, function(err, rows) {
		if (err == null) {
			res.redirect('/groups');
		} else {
			res.send(err);
		}
	});
});

router.get('/edit/:id', (req, res) => {
	GroupsModel.findAll(function(err, rows) {
		GroupsModel.findById({id: req.params.id}, function(err, editedRows){
			if (err == null) {
				res.render('groups', { id: req.params.id, data: rows, editItem: editedRows });
			} else {
				res.send(err);
			}
		});
	});	
});

router.post('/edit/:id', (req, res) => {
	GroupsModel.update({id: req.params.id, editItem: req.body}, function(err, rows, lastId){
		if (err == null) {
			res.redirect('/groups/');
		} else {
			res.send(err);
		}
	});
});

router.get('/delete/:id', (req, res) => {
	GroupsModel.removeItem({id: req.params.id}, function(err, rows, obj) {
		if (err == null) {
			res.redirect('/groups/');
		} else {
			res.send(err);
		}
	});
});

router.get('/assign_contacts/:id', (req, res) => {
	GroupsModel.findById({id: req.params.id}, function(err, editedGroups) {
		ContactsModel.findAll(function(err, allContacts) {
			res.render('assign-contacts', { id: req.params.id, editedItem: editedGroups, contacts: allContacts});
		})
	});
});

router.post('/assign_contacts/:id', (req, res) => {
	ContactsGroupsModel.create(req.body);
	res.redirect('/groups/');
});

module.exports = router; 