const bodyParser  = require('body-parser'); // Plugin untuk mengambil data dari form
const express     = require('express');
const app         = express();

const index = require('./routers/index');
const contact = require('./routers/contact');
const groups = require('./routers/groups');
const address = require('./routers/address');
const addresses_with_contact = require('./routers/addresses_with_contact');
const profiles = require('./routers/profile');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/assets', express.static('assets'));
// app.use(express.static(__dirname));
app.use(express.static("./views"));

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine


// ------- INDEX ------
app.use('/', index);

// ----- CONTACTS -----
app.use('/contacts', contact);

app.use('/addresses_with_contact', addresses_with_contact);

// ----- GROUPS -----
app.use('/groups', groups);

// ------ ADDRESS ------
app.use('/address', address);

// ------ PROFILE ------
app.use('/profiles', profiles)

// LOCALHOST CONNECTION
app.listen(3000, function() {
  console.log('Sedang Berjalan .....!!!!!');
})
