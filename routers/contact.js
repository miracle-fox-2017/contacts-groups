const express = require('express');
const router  = express.Router();


const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')


	router.get('/', function(req, res){
		Contact.findAll(function(err,rowContact){
			res.render('contacts', {edited : undefined, rowContact : rowContact})
		})
	})

	router.post('/edit', function(req, res){
		Contact.update(req.body, function(err,rowContact){
			if (err) throw err;	
			res.redirect(`/contacts`)
		})
	})	
	router.post('/', function(req, res){
		Contact.create(req.body, function(err, rowContact){
			res.redirect(`/contacts`)
		})
	})	

	router.get('/edit/:id', function(req, res){	
		Contact.findAll(function(err,rowContact){
			Contact.findById(req.params.id, function(err,editedContact){	
			res.render('contacts', {edited : editedContact  , rowContact : rowContact})	
			})
		})	
	})
	router.get('/delete/:id', function(req, res){	
		Contact.remove(req.params.id, function(){
			res.redirect('/contacts');		
		})	
	})	


module.exports = router