const fs = require('fs')
const sqlite = require('sqlite3').verbose();
const express = require('express')
const bodyParser = require('body-parser')
const db = new sqlite.Database('./db/database.db');
const app = express()


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
		console.log(req.body)
		console.log()
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
					console.log(editedId)
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})