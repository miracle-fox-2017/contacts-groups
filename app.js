
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const Contact = require('./models/contact')
const Profile = require('./models/profile')
const Group   =	require('./models/group')
const Address =	require('./models/address')
//Contacts

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

	app.get('/contacts', function(req, res){
		Contact.findAll(function(err,rowContact){
			res.render('contacts', {edited : undefined, rowContact : rowContact})
		})
	})
	app.post('/contacts/edit', function(req, res){
		Contact.update(req.body, rowContact, function(err,rowContact){
			if (err) throw err;	
			res.redirect(`/contacts`)
		})
	})	
	app.post('/contacts', function(req, res){
		Contact.create(req.body, function(err, rowContact){
			res.redirect(`/contacts`)
		})
	})	

	app.get('/contacts/edit/:id', function(req, res){	
		Contact.findAll(function(err,rowContact){
			Contact.findById(req.params.id, function(err,editedContact){	
			res.render('contacts', {edited : editedContact  , rowContact : rowContact})	
			})
		})	
	})
	app.get('/contacts/delete/:id', function(req, res){	
		Contact.remove(req.params.id, function(){
			res.redirect('/contacts');		
		})	
	})	

//Group

	app.get('/groups', function(req, res){
		Group.findAll(function(err,rowGroup){
			res.render('groups',{ edited : undefined, rowGroup : rowGroup})
		})		
	})
	app.post('/groups/edit', function(req, res){
		Group.update(req.body, function(err, rowGroup){
			res.redirect('/groups')
		})			
	})	
	app.post('/groups', function(req, res){
		Group.create(req.body, function(err, rowGroup){
			res.redirect('/groups')	
		})
	})	

	app.get('/groups/edit/:id', function(req, res){	
		Group.findAll(function(err,rowGroup){
			Group.findById(req.params.id, function(err,editedGroup){
				res.render('groups',{ edited : editedGroup , rowGroup : rowGroup})
			})					
		})
	})

	app.get('/groups/delete/:id', function(req, res){		
		Group.remove(req.params.id, function(err){
			res.redirect('/groups')
		})
	})		

//Addresses

app.get('/addresses', function(req, res){
		Address.findAllWithContact(function(err,rowAddress){
			Contact.findAll(function (err,rowContact){
				res.render('addresses',{ edited : undefined, data : rowAddress, contacts : rowContact})	
			})
		})
				
	})
	app.post('/addresses/edit', function(req, res){
		Address.update(req.body, function(err,rowAddress){
			res.redirect('/addresses')	
		})	
	})	

	app.post('/addresses', function(req, res){
		Address.create(req.body, function(err, rowAddress){
			res.redirect('/addresses')
		})	
	})	

	app.get('/addresses/edit/:id', function(req, res){		
		Address.findAllWithContact(function(err,rowAddress){
			Contact.findAll(function(err,allContact){
				Address.findById(req.params.id, function(err,editedAddress){
					res.render('addresses',{ edited : editedAddress, data : rowAddress, contacts : allContact})	
				})
			})
		})
			
	})

	app.get('/addresses/delete/:id', function(req, res){		
		Address.remove(req.params.id, function(err,rowAddress){
			res.redirect('/addresses')
		})
	})	

//Profiles

app.get('/profiles', function(req, res){
		Profile.findAllWithContact(function (err, rowProfile){
			Contact.findAll(function(err, rowContact){
				res.render('profiles',{ edited : undefined, rowProfile : rowProfile , contacts : rowContact})
			})			
		})
	})
	app.post('/profiles/edit', function(req, res){
		Profile.update(req.body, function(err, rowContact){
			res.redirect('/profiles')
		})
			
	})	
	app.post('/profiles', function(req, res){
		Profile.create(req.body, function(err, rowProfile){
			res.redirect('/profiles')
		})

	})	

	app.get('/profiles/edit/:id', function(req, res){		
		Contact.findAll(function(err,rowContact){
			Profile.findAllWithContact(function(err,rowProfile){
				Profile.findById(req.params.id, function(err, editedProfile){
					res.render('profiles',{ edited : editedProfile, rowProfile : rowProfile , contacts : rowContact})
				})
			})
		})
	})

	app.get('/profiles/delete/:id', function(req, res){		
		Profile.remove(req.params.id, function(err){
		res.redirect('/profiles')	
		})
		
	})			

	// Addresses with Contact

	app.get('/addresses_with_contact', function(req, res){
		Contact.findAll(function(err,rowContact){
			// Address.findAll(function(err,rowAddress){
			// 	res.render('addresses_with_contact',{ edited : undefined, address : rowAddress, contacts : rowContact})
			// })
			rowContact.forEach((data, index) =>{
				Address.findByContact(data.id,function (err, address){
					data['address'] = address
					if(index == rowContact.length -1){
						console.log(rowContact[1].address.length)
						res.render('addresses_with_contact', {contact : rowContact})
					}
				})
			})
		})
				
	})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})