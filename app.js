const express = require('express');
const bodyParser = require('body-parser');
const Groups = require('./models/groups');
const Addresses = require('./models/addresses');
const Profile = require('./models/profile');

const home = require('./routers/home');
const contact = require('./routers/contact');
const groups = require('./routers/groups');
const addresses = require('./routers/addresses');
const profile = require('./routers/profile');
const addresseswithcontact = require('./routers/addresses_with_contact');


const app = new express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.set('views','./views');
app.set('view engine','ejs');

//index

app.use('/', home);

// contacts

app.use('/',contact);

// groups

app.use('/',groups);

// addresses

app.use('/',addresses);

// profile

app.use('/',profile);

// addresses with contact
app.use('/', addresseswithcontact);


//seting post
app.listen(3000,function (){
    console.log('app jalan');
});