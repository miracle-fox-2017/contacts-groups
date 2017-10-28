const app = require('express')();  // immediately invoke express function
const bodyParser = require('body-parser');
const ejs = require('ejs');
const model = require('./model/model');
const contactsController = require('./controller/contacts-controller');
const groupsController = require('./controller/groups-controller');

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

app.listen('3000', () => {
  console.log(`App started on port 3000`);
});