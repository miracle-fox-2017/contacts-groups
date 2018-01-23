const express = require('express');
const router  = express.Router();

const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

	router.get('/', function(req, res){
		Address.findAllWithContact()
			.then(rowAddress =>{
			Contact.findAll().then(rowContact =>{
				res.render('addresses',{ edited : undefined, data : rowAddress, contacts : rowContact})	
			})
		})
		.catch(error =>{
			res.send(error)
		})	
	})

	router.post('/edit', function(req, res){
		Address.update(req.body).then(rowAddress =>{
			res.redirect('/addresses')
		})
	})	

	router.post('/', function(req, res){
		Address.create(req.body)
		.then(rowAddress =>{
			res.redirect('/addresses');
		})
		.catch(err =>{
			res.send(err);
		})
	})	

	router.get('/edit/:id', function(req, res){		
		Address.findAllWithContact()
		.then(rowAddress => {
			Contact.findAll()
			.then(allContact =>{
				Address.findById(req.params.id)
				.then(editedAddress =>{ 
					res.render('addresses',{ edited : editedAddress, data : rowAddress, contacts : allContact})	
				})
			})
		})
		.catch(err =>{
			res.send(err);
		})		
	})

	router.get('/delete/:id', function(req, res){		
		Address.remove(req.params.id).then(()=>{
			res.redirect('/addresses');
		})
		.catch(err =>{
			res.send(err);
		})
	})	

module.exports = router