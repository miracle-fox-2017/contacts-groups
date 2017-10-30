const express = require('express');
const router = express.Router();
const GroupsModel = require('../models/groups-model');

router.get('/', (req, res) => {
	GroupsModel.findAll(function(err, rows) {
		if (err == null) {
			res.render('groups', { data: rows });
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
	GroupsModel.delete({id: req.params.id}, function(err, rows, obj) {
		if (err == null) {
			res.redirect('/groups/');
		} else {
			res.send(err);
		}
	});
});

module.exports = router; 