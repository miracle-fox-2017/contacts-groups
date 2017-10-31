const express = require('express');
const router = express.Router();
const ContactsModel = require('../models/contacts-model');
const GroupsModel = require('../models/groups-model');
const ContactsGroupsModel = require('../models/contacts-groups-model');

router.get('/', (req, res) => {
	let arrModel = [
		GroupsModel.findAll(), ContactsModel.findAll(),
		ContactsGroupsModel.findAll()
	];

	Promise.all(arrModel).then((allModelData) => {
		let allGroups = allModelData[0];
		let allContacts = allModelData[1];
		let allContactGroup = allModelData[2];
		let arrJoinedGroups = GroupsModel.findAllJoinConjunction(allGroups, allContacts, allContactGroup);

		res.render('groups', {
			data: allGroups,
		 	joinedGroups: arrJoinedGroups 
		});
	})
	.catch((err) => { res.send(err) });
});

router.post('/', (req, res) => {
	GroupsModel.create(req.body).then((allGroupsData) => {
		res.redirect('/groups');
	}).catch((err) => { res.send(err); });
});

router.get('/edit/:id', (req, res) => {
	let arrModel = [
		GroupsModel.findAll(), GroupsModel.findById({id: req.params.id}),
		ContactsModel.findAll(), ContactsGroupsModel.findAll()
	];

	Promise.all(arrModel)
		.then((allModelData) => {
			let allGroupsData = allModelData[0];
			let editedGroupRow = allModelData[1];
			let allContactsData = allModelData[2];
			let allContactGroupData = allModelData[3];
			let arrJoinedGroups = GroupsModel.findAllJoinConjunction(allGroupsData, allContactsData, allContactGroupData);

			res.render('groups', { 
				id: req.params.id, data: allGroupsData, 
				editItem: editedGroupRow, joinedGroups : arrJoinedGroups 
			});
		})
		.catch(err => res.send(err));
});

router.post('/edit/:id', (req, res) => {
	GroupsModel.update({id: req.params.id, editItem: req.body})
		.then((allGroupsModel) => {
			res.redirect('/groups/');
		})
		.catch(err => res.send(err));
});

router.get('/delete/:id', (req, res) => {
	GroupsModel.removeItem({id: req.params.id})
		.then((allGroupsData) => {
			res.redirect('/groups/');
		}) .catch((err) => { res.send(err) })
});

router.get('/assign_contacts/:id', (req, res) => {
	GroupsModel.findById({id: req.params.id})
		.then((editedGroupRow) => {
			ContactsModel.findAll()
				.then((allContacts) => {
					res.render('assign-contacts', { id: req.params.id, editedItem: editedGroupRow, contacts: allContacts});
				})
				.catch(err => res.send(err));
		})
		.catch((err) => res.send(err));
});

router.post('/assign_contacts/:id', (req, res) => {
	ContactsGroupsModel.create(req.body)
		.then((allContactGroupData) => {
			res.redirect('/groups/');
		})
		.catch(err => res.send(err));
});

module.exports = router; 