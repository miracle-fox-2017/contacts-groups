const app = require('express')();  // immediately invoke express function
const bodyParser = require('body-parser');
const ejs = require('ejs');
const model = require('./model/model');
const contactsController = require('./controller/contacts-controller');
const groupsController = require('./controller/groups-controller');
const addressController = require('./controller/address-controller');
const profilesController = require('./controller/profiles-controller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', './view');
app.set('view engine', 'ejs');

app.get('/', contactsController.getHome);

app.get('/contacts', contactsController.getContacts);
app.post('/contacts', contactsController.postContacts);
app.get('/contacts/edit/:id', contactsController.getEditContacts);
app.post('/contacts/edit/:id', contactsController.postEditContacts);
app.get('/contacts/delete/:id', contactsController.deleteContacts);

app.get('/groups', groupsController.getGroups);
app.post('/groups', groupsController.postGroups);
app.get('/groups/edit/:id', groupsController.getEditGroups);
app.post('/groups/edit/:id', groupsController.postEditGroups);
app.get('/groups/delete/:id', groupsController.deleteGroups);

app.get('/address', addressController.getAddress);
app.post('/address', addressController.postAddress);
app.get('/address/edit/:id', addressController.getEditAddress);
app.post('/address/edit/:id', addressController.postEditAddress);
app.get('/address/delete/:id', addressController.deleteAddress);

app.get('/profiles', profilesController.getProfiles);
app.post('/profiles', profilesController.postProfiles);
app.get('/profiles/edit/:id', profilesController.getEditProfiles);
app.post('/profiles/edit/:id', profilesController.postEditProfiles);
app.get('/profiles/delete/:id', profilesController.deleteProfiles);

app.listen('3000', () => {
  console.log(`App started on port 3000`);
});