const express = require('express');
const router = express.Router();


const Contact = require('../models/contact')
const Profile = require('../models/profile')
const Group   =	require('../models/group')
const Address =	require('../models/address')

	router.get('/', function(req, res){
		Group.findAll()
		.then(rowGroup =>{
			res.render('groups',{ edited : undefined, rowGroup : rowGroup})
		})
		.catch(err =>{
			res.send(err);
		})		
	})

	router.post('/edit', function(req, res){
		Group.update(req.body)
		.then(rowGroup =>{
			res.redirect('/groups')
		})
		.catch(err =>{
			res.send(err);
		})
	})	
	router.post('/', function(req, res){
		Group.create(req.body)
		.then(rowGroup =>{
			res.redirect('/groups')
		})
		.catch(err =>{
			res.send(err);
		})
	})	

	router.get('/edit/:id', function(req, res){	
		Group.findAll()
		.then(rowGroup =>{
			Group.findById(req.params.id)
			.then(editedGroup =>{
				res.render('groups',{ edited : editedGroup , rowGroup : rowGroup})
			})
		})
		.catch(err =>{
			res.send(err);
		})
	})

	router.get('/delete/:id', function(req, res){		
		Group.remove(req.params.id)
		.then(()=>{
			res.redirect('/groups')
		})
		.catch(err =>{
			res.send(err);
		})
	})		

module.exports = router