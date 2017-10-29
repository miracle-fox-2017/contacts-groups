const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ContactsModel = require('./models/contacts');
const GroupsModel = require('./models/groups');
const ProfilesModel = require('./models/profiles');
const AddressesModel = require('./models/addresses');

let contact = new ContactsModel('./db/database.db');
let group = new GroupsModel('./db/database.db');
let profile = new ProfilesModel('./db/database.db');
let address = new AddressesModel('./db/database.db');
 
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', (req, res) => {
  res.render('index')
})

  app.get('/contacts', (req, res) => {
    contact.getAllData(function(rows) {
      res.render('contacts', { data: rows });
    });
  });

  app.post('/contacts', (req, res) => {
    contact.tambahData(req.body);
    res.redirect('/contacts');
  });

  app.get('/contacts/edit/:id', (req, res) => {
    contact.getAllData(function(rows) {
      contact.getById({id: req.params.id}, (editedRows) =>{
        res.render('contacts', { id: req.params.id, data: rows, edited: editedRows });
      });
    });	
  });

  app.post('/contacts/edit/:id', (req, res) => {
    contact.updateDataById({id: req.params.id, edited: req.body});
    res.redirect('/contacts/');
  });

  app.get('/contacts/delete/:id', (req, res) => {
    contact.hapusDataByID({id: req.params.id});
    res.redirect('/contacts/');
  });

  app.get('/groups', (req, res) => {
    group.getAllData(function(rows) {
      res.render('groups', { data: rows });
    });
  });

  app.post('/groups', (req, res) => {
    group.tambahData(req.body);
    res.redirect('/groups');
  });

  app.get('/groups/edit/:id', (req, res) => {
    group.getAllData(function(rows) {
      group.getById({id: req.params.id}, (editedRows) =>{
        res.render('groups', { id: req.params.id, data: rows, edited: editedRows });
      });
    });	
  });

  app.post('/groups/edit/:id', (req, res) => {
    group.updateDataById({id: req.params.id, edited: req.body});
    res.redirect('/groups/');
  });

  app.get('/groups/delete/:id', (req, res) => {
    group.hapusDataByID({id: req.params.id});
    res.redirect('/groups/');
  });

  // Profile
  app.get('/profiles', (req, res) => {
    profile.getAllData(function(rows) {
      res.render('profile', { data: rows});
    });
    
  });

  app.post('/profiles', (req, res) => {
  profile.tambahData(req.body);
  res.redirect('/profiles');
  });

  app.get('/profiles/edit/:id', (req, res) => {
    contact.getAllData(function(rows) {
      profile.getById({id: req.params.id}, (editedRows) => {
        res.render('profile', { id: req.params.id, data: rows});
      });
    });
  });	


  app.post('/profiles/edit/:id', (req, res) => {
  profile.updateDataById({id: req.params.id, edited: req.body});
  res.redirect('/profiles/');
  });

  app.get('/profiles/delete/:id', (req, res) => {
  profile.hapusDataByID({id: req.params.id});
  res.redirect('/profiles/');
  });

  app.get('/addresses', (req, res) => {
  address.getAllData(function(rows) {
    res.render('addresses', { data: rows });
    });
  });

  app.post('/addresses', (req, res) => {
  address.tambahData(req.body);
  res.redirect('/addresses');
  });

  app.get('/addresses/edit/:id', (req, res) => {
  address.getAllData(function(rows) {
    address.getById({id: req.params.id}, (editedRows) =>{
      res.render('addresses', { id: req.params.id, data: rows, edited: editedRows });
    });
    });	
  });

  app.post('/addresses/edit/:id', (req, res) => {
  address.updateDataById({id: req.params.id, edited: req.body});
  res.redirect('/addresses/');
  });

  app.get('/addresses/delete/:id', (req, res) => {
  address.hapusDataByID({id: req.params.id});
  res.redirect('/addresses/');
  });

  // Listening
  app.listen(3001, () => {
  console.log('Listening port 3001');
  });

