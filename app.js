const app = require('express')();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const index = require('./routes/index');
const contacts = require('./routes/contacts');
const groups = require('./routes/groups');
const address = require('./routes/address');
const profiles = require('./routes/profiles');

app.set('views', './view');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/contacts', contacts);
app.use('/groups', groups);
app.use('/address', address);
app.use('/profiles', profiles);

app.listen('3000', () => {
  console.log(`App started on port 3000`);
});