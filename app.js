const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ContactsModel = require('./models/contacts-model');

// Model
let contact = new ContactsModel('./database/database.db');

// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Setup view
app.set('views', './views');
app.set('view engine', 'ejs');

// Website route
app.get('/', (req, res) => {
	res.render('index');
});

// Contacts
app.get('/contacts', (req, res) => {
	contact.getAllData(function(rows) {
		res.render('contacts', { data: rows });
	});
});

app.post('/contacts', (req, res) => {
	contact.addData(req.body);
	res.redirect('/contacts');
});

app.get('/contacts/edit/:id', (req, res) => {
	contact.getAllData(function(rows) {
		contact.getById({id: req.params.id}, (editedRows) =>{
			res.render('contacts', { id: req.params.id, data: rows, editItem: editedRows });
		});
	});	
});

app.post('/contacts/edit/:id', (req, res) => {
	contact.updateDataById({id: req.params.id, editItem: req.body});
	res.redirect('/contacts/');
});

app.get('/contacts/delete/:id', (req, res) => {
	contact.deleteDataById({id: req.params.id});
	res.redirect('/contacts/');
});

// Listening
app.listen(3001, () => {
	console.log('Listening port 3001');
});