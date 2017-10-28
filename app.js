const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const db = new sqlite3.Database('./db/database.db');
const app = new express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());



app.set('views','./views');
app.set('view engine','ejs');

//index
app.get('/',function(req,res){
    res.render('index');
});


// contacts
app.get('/contact', function (req, res) {
    const Contact = require('./models/contact');
    let contact = new Contact();
    db.all(contact.panggilData(), function (err, rowsContacts) {
        res.render('contact', { rowsContacts });
    });
});

app.get('/contact/add', function (req, res) {
    // const Contact = require('./models/contact');
    // let contact = new Contact();
    // db.all(contact.panggilData(), function (err, rowsContacts) {
        res.render('addcontact');
    // });
});

app.post('/contact/add', function (req, res) {
    const Contact = require('./models/contact');
    let obj = { nama : req.body.nama,
                company : req.body.company,
                telp : req.body.telp,
                email : req.body.email,
              }
    let contact = new Contact();
    db.all(contact.simpanData(obj), function (err, rowsContacts) {
    // console.log(req.body.nama)
        res.redirect('/contact');
    });
});

app.get('/contact/edit/:id', function (req, res) {
    const Contact = require('./models/contact');
    let contact = new Contact();
    db.all(contact.editData(req.params.id), function (err, rowsContacts) {
        // console.log(rowsContacts);
        res.render('editcontact', { rowsContacts });
    });
});

app.post('/contact/edit/:id', function (req, res) {
    const Contact = require('./models/contact');
    let contact = new Contact();
    let obj = {
        nama: req.body.nama,
        company: req.body.company,
        telp: req.body.telp,
        email: req.body.email,
        id : req.params.id,
    }
    db.all(contact.updateData(obj), function (err, rowsContacts) {
        // console.log(rowsContacts);
        res.redirect('/contact');
    });
});

app.get('/contact/hapus/:id', function (req, res) {
    const Contact = require('./models/contact');
    let contact = new Contact();
    db.all(contact.hapusData(req.params.id), function (err, rowsContacts) {
        // console.log(rowsContacts);
        res.redirect('/contact');
    });
});

// groups
app.get('/groups', function (req, res) {
    const Groups = require('./models/groups');
    let groups = new Groups();
    db.all(groups.panggilData(), function (err, rowsGroups) {
        res.render('groups', { rowsGroups });
    });
});

app.get('/groups/add', function (req, res) {
    // const Contact = require('./models/contact');
    // let contact = new Contact();
    // db.all(contact.panggilData(), function (err, rowsContacts) {
    res.render('addgroups');
    // });
});

app.post('/groups/add', function (req, res) {
    const Groups = require('./models/groups');
    let obj = {
        nama: req.body.nama
    }
    let groups = new Groups();
    db.all(groups.simpanData(obj), function (err, rowsGroups) {
        // console.log(req.body.nama)
        res.redirect('/groups');
    });
});

app.get('/groups/edit/:id', function (req, res) {
    const Groups = require('./models/groups');
    let groups = new Groups();
    db.all(groups.editData(req.params.id), function (err, rowsGroups) {
        // console.log(rowsContacts);
        res.render('editgroups', { rowsGroups });
    });
});

app.post('/groups/edit/:id', function (req, res) {
    const Groups = require('./models/groups');
    let groups = new Groups();
    let obj = {
        nama: req.body.nama,
        id: req.params.id,
    }
    db.all(groups.updateData(obj), function (err, rowsGroups) {
        // console.log(rowsContacts);
        res.redirect('/groups');
    });
});

app.get('/groups/hapus/:id', function (req, res) {
    const Groups = require('./models/groups');
    let groups = new Groups();
    db.all(groups.hapusData(req.params.id), function (err, rowsGroups) {
        // console.log(rowsContacts);
        res.redirect('/groups');
    });
});

// addresses
app.get('/addresses', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    db.all(addresses.panggilData(), function (err, rowsAddresses) {
        res.render('addresses', { rowsAddresses });
    });
});

app.get('/addresses/add', function (req, res) {
    // const Contact = require('./models/contact');
    // let contact = new Contact();
    // db.all(contact.panggilData(), function (err, rowsContacts) {
    res.render('addaddresses');
    // });
});

app.post('/addresses/add', function (req, res) {
    const Addresses = require('./models/addresses');
    let obj = {
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
    }
    let addresses = new Addresses();
    db.all(addresses.simpanData(obj), function (err, rowsAddresses) {
        // console.log(req.body.nama)
        res.redirect('/addresses');
    });
});

app.get('/addresses/edit/:id', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    db.all(addresses.editData(req.params.id), function (err, rowsAddresses) {
        // console.log(rowsContacts);
        res.render('editaddresses', { rowsAddresses });
    });
});

app.post('/addresses/edit/:id', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    let obj = {
        street: req.body.street,
        city: req.body.city,
        zipcode: req.body.zipcode,
        id: req.params.id,
    }
    db.all(addresses.updateData(obj), function (err, rowsAddresses) {
        // console.log(rowsContacts);
        res.redirect('/addresses');
    });
});

app.get('/addresses/hapus/:id', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    db.all(addresses.hapusData(req.params.id), function (err, rowsAddresses) {
        // console.log(rowsContacts);
        res.redirect('/addresses');
    });

});

// profile
app.get('/profile', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    db.all(profile.panggilData(), function (err, rowsProfile) {
        res.render('profile', { rowsProfile });
    });
});

app.get('/profile/add', function (req, res) {
    // const Contact = require('./models/contact');
    // let contact = new Contact();
    // db.all(contact.panggilData(), function (err, rowsContacts) {
    res.render('addprofile');
    // });
});

app.post('/profile/add', function (req, res) {
    const Profile = require('./models/profile');
    let obj = {
        nama: req.body.nama,
        password: req.body.password
    }
    let profile = new Profile();
    db.all(profile.simpanData(obj), function (err, rowsProfile) {
        // console.log(req.body.nama)
        res.redirect('/profile');
    });
});

app.get('/profile/edit/:id', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    db.all(profile.editData(req.params.id), function (err, rowsProfile) {
        // console.log(rowsContacts);
        res.render('editprofile', { rowsProfile });
    });
});

app.post('/profile/edit/:id', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    let obj = {
        nama: req.body.nama,
        password: req.body.password,
        id: req.params.id,
    }
    db.all(profile.updateData(obj), function (err, rowsProfile) {
        // console.log(rowsContacts);
        res.redirect('/profile');
    });
});

app.get('/profile/hapus/:id', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    db.all(profile.hapusData(req.params.id), function (err, rowsProfile) {
        // console.log(rowsContacts);
        res.redirect('/profile');
    });
});


//seting post
app.listen(3000,function (){
    console.log('app jalan');
});