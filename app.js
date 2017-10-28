const fs = require('fs')
const sqlite = require('sqlite3').verbose();
const express = require('express')
const bodyParser = require('body-parser')
const db = new sqlite.Database('./db/database.db');
const app = express()

//Contacts

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

	app.get('/contacts', function(req, res){
		db.all(`SELECT * FROM Contacts`,(err, data)=>{
			if (err) throw err;
			res.render('contacts',{ edited : undefined, data : data})
		})
	})
	app.post('/contacts/edit', function(req, res){
		db.all(`UPDATE Contacts SET name = "${req.body.name}" , company = "${req.body.company}" , telp_number = "${req.body.telp_number}", email = "${req.body.email}" WHERE id = ${req.body.id}`,(err, data)=>{
			if (err) throw err;
			// res.render('contacts',{ edited : undefined, data : data})
			res.redirect('/contacts')
		})
	})	
	app.post('/contacts', function(req, res){
		db.all(`INSERT INTO Contacts (name,company,telp_number,email)
			VALUES ("${req.body.name}", "${req.body.company}" , "${req.body.telp_number}", "${req.body.email}")`,(err, data)=>{
			if (err) throw err;
			res.redirect('/contacts')
		})
	})	

	app.get('/contacts/edit/:id', function(req, res){		
		db.all(`SELECT * FROM Contacts`,(err, alldata)=>{
			if (err) throw err;
			let editedId ;

			for(let i =0 ; i<alldata.length ; i++){		
				if(alldata[i].id == req.params.id){
					editedId = i;
				}
			}
			res.render('contacts',{ edited : editedId , data : alldata})
		})
	})
	app.get('/contacts/delete/:id', function(req, res){		
		db.all(`DELETE FROM Contacts WHERE id = "${req.params.id}"`,(err, data)=>{
			if (err) throw err;
		})
		res.redirect('/contacts')
	})	

//Group

	app.get('/groups', function(req, res){
		db.all(`SELECT * FROM Groups`,(err, data)=>{
			if (err) throw err;
			res.render('groups',{ edited : undefined, data : data})
		})
	})
	app.post('/groups/edit', function(req, res){
		db.all(`UPDATE Groups SET name_of_group = "${req.body.name_of_group}" WHERE id = ${req.body.id}`,(err, data)=>{
			if (err) throw err;
			// res.render('contacts',{ edited : undefined, data : data})
			res.redirect('/groups')
		})
	})	
	app.post('/groups', function(req, res){
		db.all(`INSERT INTO Groups (name_of_group)
			VALUES ("${req.body.name_of_group}")`,(err, data)=>{
			if (err) throw err;
			res.redirect('/groups')
		})
	})	

	app.get('/groups/edit/:id', function(req, res){		
		db.all(`SELECT * FROM Groups`,(err, alldata)=>{
			if (err) throw err;
			let editedId ;

			for(let i =0 ; i<alldata.length ; i++){		
				if(alldata[i].id == req.params.id){
					editedId = i;
				}
			}
			res.render('groups',{ edited : editedId , data : alldata})
		})
	})
	app.get('/groups/delete/:id', function(req, res){		
		db.all(`DELETE FROM Groups WHERE id = "${req.params.id}"`,(err, data)=>{
			if (err) throw err;
		})
		res.redirect('/groups')
	})		

//Addresses

app.get('/addresses', function(req, res){
		db.all(`SELECT * FROM Addresses`,(err, data)=>{
			if (err) throw err;
			res.render('addresses',{ edited : undefined, data : data})
		})
	})
	app.post('/addresses/edit', function(req, res){
		db.all(`UPDATE addresses SET street = "${req.body.street}", city = "${req.body.city}", zipcode = ${req.body.zipcode}  WHERE id = ${req.body.id}`,(err, data)=>{
			if (err) throw err;
			// res.render('contacts',{ edited : undefined, data : data})
			res.redirect('/addresses')
		})
	})	
	app.post('/addresses', function(req, res){
		db.all(`INSERT INTO Addresses (street, city , zipcode)
			VALUES ("${req.body.street}", "${req.body.city}", ${req.body.zipcode})`,(err, data)=>{
			if (err) throw err;
			res.redirect('/addresses')
		})
	})	

	app.get('/addresses/edit/:id', function(req, res){		
		db.all(`SELECT * FROM Addresses`,(err, alldata)=>{
			if (err) throw err;
			let editedId ;

			for(let i =0 ; i<alldata.length ; i++){		
				if(alldata[i].id == req.params.id){
					editedId = i;
				}
			}
			res.render('addresses',{ edited : editedId , data : alldata})
		})
	})
	app.get('/addresses/delete/:id', function(req, res){		
		db.all(`DELETE FROM Addresses WHERE id = "${req.params.id}"`,(err, data)=>{
			if (err) throw err;
		})
		res.redirect('/addresses')
	})	

//Profiles

app.get('/profiles', function(req, res){
		db.all(`SELECT * FROM Profile`,(err, data)=>{
			if (err) throw err;
			res.render('profiles',{ edited : undefined, data : data})
		})
	})
	app.post('/profiles/edit', function(req, res){
		db.all(`UPDATE Profiles SET username = "${req.body.username}", password = "${req.body.password}" WHERE id = ${req.body.id}`,(err, data)=>{
			if (err) throw err;
			// res.render('contacts',{ edited : undefined, data : data})
			res.redirect('/profiles')
		})
	})	
	app.post('/profiles', function(req, res){
		db.all(`INSERT INTO Profile (username, password)
			VALUES ("${req.body.username}", "${req.body.password}")`,(err, data)=>{
			if (err) throw err;
			res.redirect('/profiles')
		})
	})	

	app.get('/profiles/edit/:id', function(req, res){		
		db.all(`SELECT * FROM Profile`,(err, alldata)=>{
			if (err) throw err;
			let editedId ;

			for(let i =0 ; i<alldata.length ; i++){		
				if(alldata[i].id == req.params.id){
					editedId = i;
				}
			}
			res.render('profiles',{ edited : editedId , data : alldata})
		})
	})
	app.get('/profiles/delete/:id', function(req, res){		
		db.all(`DELETE FROM Profile WHERE id = "${req.params.id}"`,(err, data)=>{
			if (err) throw err;
		})
		res.redirect('/profiles')
	})				

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})