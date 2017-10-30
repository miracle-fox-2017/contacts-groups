const express = require('express');
const router = express.Router();


const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

	router.get('/', function(req, res){
		Group.findAll(function(err,rowGroup){
			res.render('groups',{ edited : undefined, rowGroup : rowGroup})
		})		
	})
	router.post('/edit', function(req, res){
		Group.update(req.body, function(err, rowGroup){
			res.redirect('/groups')
		})			
	})	
	router.post('/', function(req, res){
		Group.create(req.body, function(err, rowGroup){
			res.redirect('/groups')	
		})
	})	

	router.get('/edit/:id', function(req, res){	
		Group.findAll(function(err,rowGroup){
			Group.findById(req.params.id, function(err,editedGroup){
				res.render('groups',{ edited : editedGroup , rowGroup : rowGroup})
			})					
		})
	})

	router.get('/delete/:id', function(req, res){		
		Group.remove(req.params.id, function(err){
			res.redirect('/groups')
		})
	})		

module.exports = router