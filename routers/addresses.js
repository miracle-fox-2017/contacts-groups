let express = require('express');
let router = express.Router();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Addresses = require('../models/addressesMod')
let Contacts = require('../models/contactsMod')

router.get('/',function(req,res){
	Promise.all([Addresses.getAddress(),Contacts.getContacts()]).then(function(rows){
		res.render('addresses',{dataJsonAddresses:rows[0],dataJsonContacts:rows[1]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/', function (req, res) {
	Addresses.getPost(req).then(function(rows){
		res.redirect('/addresses')
	}).catch(function(err){
		console.log(err);
	});
})

router.get('/edit/:id',function(req,res){
	Promise.all([Addresses.getEdit(req),Contacts.getContacts()]).then(function(rows){
		res.render('editAddress',{dataJsonAddresses:rows[0][0],dataJsonContacts:rows[1]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/edit/:id',function(req,res){
	Addresses.updateAddress(req).then(function(){
		res.redirect('/addresses')
	}).catch(function(err){
		console.log(err);
	})
})

router.get('/delete/:id',function(req,res){
	Addresses.deleteAddress(req).then(function(){
		res.redirect('/addresses')
	}).catch(function(err){
		console.log(err);
	})
})

module.exports = router
