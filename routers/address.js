const express = require('express');
const router  = express.Router();


const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

	router.get('/', function(req, res){
		Address.findAllWithContact(function(err,rowAddress){
			Contact.findAll(function (err,rowContact){
				res.render('addresses',{ edited : undefined, data : rowAddress, contacts : rowContact})	
			})
		})
				
	})
	router.post('/edit', function(req, res){
		Address.update(req.body, function(err,rowAddress){
			res.redirect('/addresses')	
		})	
	})	

	router.post('/', function(req, res){
		Address.create(req.body, function(err, rowAddress){
			res.redirect('/addresses')
		})	
	})	

	router.get('/edit/:id', function(req, res){		
		Address.findAllWithContact(function(err,rowAddress){
			Contact.findAll(function(err,allContact){
				Address.findById(req.params.id, function(err,editedAddress){
					res.render('addresses',{ edited : editedAddress, data : rowAddress, contacts : allContact})	
				})
			})
		})
			
	})

	router.get('/delete/:id', function(req, res){		
		Address.remove(req.params.id, function(err,rowAddress){
			res.redirect('/addresses')
		})
	})	

module.exports = router