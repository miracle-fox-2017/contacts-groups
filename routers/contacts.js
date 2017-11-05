let express = require('express');
let router = express.Router();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Contacts = require('../models/contactsMod')
let Contacts_Groups = require('../models/contactsGroupsMod')
let Groups = require('../models/groupsMod')
let Addresses = require('../models/addressesMod')

router.get('/',function(req,res){
	Promise.all([Contacts.getContacts(),Groups.getGroups(),Contacts_Groups.getContactsGroups()])
	.then(function(rows){
		res.render('contacts',{dataJsonContacts:rows[0],dataJsonContactsGroups:rows[1],dataJsonContactsGroupsName:rows[2]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/', function (req, res) {
  Contacts.getPost(req).then(function(contactId){
		Contacts_Groups.getPost(req,contactId).then(function(){
			res.redirect('/contacts')
		})
	}).catch(function(err){
		console.log(err);
	});
})

router.get('/edit/:id',function(req,res){
	Contacts.getEdit(req).then(function(rows){
		res.render('editContact',{dataJsonContacts:rows})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/edit/:id',function(req,res){
	Contacts.updateContacts(req).then(function(){
		res.redirect('/contacts')
	}).catch(function(err){
		console.log(err);
	})
})

router.get('/delete/:id',function(req,res){
	Contacts.deleteContact(req).then(function(){
		res.redirect('/contacts')
	}).catch(function(err){
		console.log(err);
	});
})

router.get('/addresses/:id',function(req,res){
	Promise.all([Contacts.getContactById(req),Contacts.getAddAddress(req)]).then(function(rows){
		res.render('addAddress',{dataJsonContacts:rows[0],dataJsonAddresses:rows[1]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/addresses/:id',function(req,res){
	Contacts.postAddAddress(req).then(function(){
		res.redirect('/addresses')
	}).catch(function(err){
		console.log(err);
	})
})

module.exports = router
