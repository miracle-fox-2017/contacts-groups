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
app.get('/addresses_with_contact', function (req, res) {
    db.all(addresses.panggil(), function (err, rowsAddresses) {
        if (rowsAddresses){
            rowsAddresses.forEach(function(element) {
                db.all(addresses.dataContact(element.idcontact), function (err, rowsContacts) {
                    // console.log(element.idcontact);
                    res.render('addresseswith', { rowsAddresses, rowsContacts});
                });    
            });
            
        }
        
    });
});


//seting post
app.listen(3000,function (){
    console.log('app jalan');
});