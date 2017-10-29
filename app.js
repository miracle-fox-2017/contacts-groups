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
    let error = { error: null };
    res.render('addcontact', { error });
    // });
});

app.post('/contact/add', function (req, res) {
    const Contact = require('./models/contact');
    if (req.body.nama != '' && req.body.company != '' && req.body.telp != '' && req.body.email !=''){
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
    }else{
        let error = {error:"Maaf Data Tidak Boleh Ada Yang Kosong"};
        res.render('addcontact', { error });
    }
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
        let error = {error:null}
        res.render('addresses', { rowsAddresses, error });
    });
});

app.get('/addresses/add', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    db.all(addresses.panggilDataContact(), function (err, rowsContacts) {
        let error = { error: null }
        res.render('addaddresses', { rowsContacts,error });
    });
});

app.post('/addresses/add', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
        if (req.body.street != '' && req.body.city != '') {
        let obj = {
            street: req.body.street,
            city: req.body.city,
            zipcode: req.body.zipcode,
            idcontact: req.body.idcontact,
        }
        
        db.all(addresses.simpanData(obj), function (err, rowsAddresses) {
            // console.log(req.body.nama)
            res.redirect('/addresses');
        });
    }else{
            db.all(addresses.panggilDataContact(), function (err, rowsContacts) {
                let error = { error: "Data Harus Di isi" }
                res.render('addaddresses', { rowsContacts, error });
            });
    }
});

app.get('/addresses/edit/:id', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    db.all(addresses.editData(req.params.id), function (err, rowsAddresses) {
        db.all(addresses.panggilDataContact(), function(err,rowsContacts){
            let error = { error: null }
            res.render('editaddresses', { rowsAddresses, rowsContacts, error});
        })
    });
});

app.post('/addresses/edit/:id', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
    if (req.body.street != '' && req.body.city != ''){
        let obj = {
            street: req.body.street,
            city: req.body.city,
            zipcode: req.body.zipcode,
            idcontact: req.body.idcontact,
            id: req.params.id,
        }
        db.all(addresses.updateData(obj), function (err, rowsAddresses) {
            // console.log(rowsContacts);
            res.redirect('/addresses');
        });
    }else{
        db.all(addresses.editData(req.params.id), function (err, rowsAddresses) {
            db.all(addresses.panggilDataContact(), function (err, rowsContacts) {
                let error = { error: "Data Harus Di isi" }
                res.render('editaddresses', { rowsAddresses, rowsContacts, error});
            })
        });
    }
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
    const Profile = require('./models/profile');
    let profile = new Profile();
    db.all(profile.dataContact(), function (err, rowsContacts) {
        let error = { error: null };
        res.render('addprofile', { rowsContacts, error });
    });
});

app.post('/profile/add', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    if ((req.body.idcontact != null) && (req.body.nama != '') && (req.body.password != '')){
        db.all(profile.cekContact(req.body.idcontact), function(err, rowCek){
            if (rowCek.length > 0){
                db.all(profile.dataContact(), function (err, rowsContacts) {
                    let error = { error: "Data Contact SUdah Terpakai" };
                    res.render('addprofile', { rowsContacts, error });
                });    
            }else{
                let obj = {
                    idcontact: req.body.idcontact,
                    nama: req.body.nama,
                    password: req.body.password
                }
                db.all(profile.simpanData(obj), function (err, rowsProfile) {
                    // console.log(req.body.nama)
                    res.redirect('/profile');
                });
            }
        })
    }else{
        db.all(profile.dataContact(), function (err, rowsContacts) {
            let error = { error: "Data Tidak Boleh Ada Yang Kosong" };
            res.render('addprofile', { rowsContacts, error });
        });
    }
});

app.get('/profile/edit/:id', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    db.all(profile.editData(req.params.id), function (err, rowsProfile) {
        db.all(profile.dataContact(), function (err, rowsCountact) {
            res.render('editprofile', { rowsProfile, rowsCountact });
        })
    });
});

app.post('/profile/edit/:id', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    console.log(req.body.nama)
    if ((req.body.password != '') && (req.body.nama!='')) {
        let obj = {
            nama: req.body.nama,
            password: req.body.password,
            id: req.params.id,
        }
        let profile = new Profile();
        db.all(profile.updateData(obj), function (err, rowsProfile) {
            // console.log(req.body.nama)
            res.redirect('/profile');
        });
    }else{
        res.redirect('../../profile/edit/' + req.params.id);
    }
});

app.get('/profile/hapus/:id', function (req, res) {
    const Profile = require('./models/profile');
    let profile = new Profile();
    db.all(profile.hapusData(req.params.id), function (err, rowsProfile) {
        // console.log(rowsContacts);
        res.redirect('/profile');
    });
});


// addresses with contact
app.get('/addresses_with_contact', function (req, res) {
    const Addresses = require('./models/addresses');
    let addresses = new Addresses();
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