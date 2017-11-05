let express = require('express');
let router = express.Router();
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

let Groups = require('../models/groupsMod')
let Contacts_Groups = require('../models/contactsGroupsMod')
let Contacts = require('../models/contactsMod')

router.get('/',function(req,res){
	Promise.all([Groups.getGroups(),Contacts_Groups.getContactsGroups()]).then(function(rows){
		res.render('groups.ejs',{dataJsonGroups:rows[0],dataJsonContactsGroups:rows[1]});
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/', function (req, res) {
	Groups.addGroup(req).then(function(rows){
		res.redirect('/groups')
	}).catch(function(err){
		console.log(err);
	})
})

router.get('/edit/:id',function(req,res){
	Groups.getGroup(req).then(function(rows){
		res.render('editGroup.ejs',{dataJsonGroups:rows});
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/edit/:id',function(req,res){
	Groups.editGroup(req).then(function(rows){
		res.redirect('/groups')
	}).catch(function(err){
		console.log(err);
	})
})

router.get('/delete/:id',function(req,res){
	Groups.deleteGroup(req).then(function(){
		res.redirect('/groups')
	}).catch(function(err){
		console.log(err);
	})
})

router.get('/contacts/:id',function(req,res){
	Promise.all([Groups.assignContacts(req),Contacts.getContacts()]).then(function(rows){
		res.render('assignContacts',{dataJsonGroups:rows[0],dataJsonContacts:rows[1]})
	}).catch(function(err){
		console.log(err);
	})
})

router.post('/contacts/:id',function(req,res){
	Groups.postAssignContacts(req).then(function(){
		res.redirect('/groups')
	}).catch(function(err){
		console.log(err);
	})
})

module.exports = router
