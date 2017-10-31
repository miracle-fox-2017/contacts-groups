const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const Group = require('../models/groups');
const ContactsGroups = require('../models/contacts_groups');
const Address = require('../models/addresses');

//menampilkan semua data contacts
//PROMISE
router.get('/', function (req, res) {
  Contact.findAll(req.body).then((result1) => {
    Group.findAll(req.body).then((result2) => {
      ContactsGroups.findAll(req.body).then((result3) => {
        res.render('contacts.ejs', { error: null, dataContacts: result1, dataGroups: result2, dataContactsGroups: result3 });
      });
    });
  });
});

// router.get('/', function (req, res) {
//   Contact.findAll(dataContacts => {
//     Group.findAll(dataGroups => {
//       ContactsGroups.findAll(dataContactsGroups => {
//         res.render('contacts.ejs', { error: null, dataContacts: dataContacts, dataGroups: dataGroups, dataContactsGroups: dataContactsGroups });
//       });
//     });
//   });
// });

// Menampilkan data contact spesifik untuk diubah
router.get('/edit/:id', (req, res) => {
  Contact.editById(req.params.id).then((result) => {
    res.render('contactEdit.ejs', { data: result });
  });
});
router.post('/edit/:id', function (req, res) {
  Contact.update(req.body, req.params).then((result) => {
    res.redirect('../../contacts');
  });
});

// Delete data contacts
router.get('/delete/:id', (req, res) => {
  Contact.delete(req.params.id).then((result) => {
    res.redirect('../../contacts');
  });
});

// menampilkan semua address di contact
router.get('/address/:id', (req, res) => {
  Address.editByContactId(req.params.id).then((resultAddress) => {
    Contact.editById(req.params.id).then((resultContact) => {
      res.render('addresses_with_contact', { data: resultAddress, dataContacts: resultContact });
    });
  });
});

// menerima input contact address
router.post('/address/:id', function (req, res) {
  Address.createContactId(req.body, req.params).then(function (result) {
    res.redirect(`/addresses`);
  });
});

//menerima input data contacts
router.post('/', function (req, res) {
  Contact.create(req.body).then(function (lastID) {
    // console.log(lastID);
    ContactsGroups.createContact(lastID, req.body.GroupId).then(function () {
      res.redirect('contacts');
    });
  });
});
// app.post('/contacts', function (req, res) {
//   db.run(`INSERT into Contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`, function (err, rows) {
//     let id = this.lastID;
//     db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${id}', '${req.body.GroupId}')`, (err, rows) => {
//       res.redirect('contacts');
//     });
//   });
// });

// app.post('/contacts/address/:id', (req, res) => {
//   db.run(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}', '${req.body.city}','${req.body.zipcode}', '${req.body.ContactId}')`, (err) => {
//     res.redirect(`/contacts/address/${req.params.id}`);
//   });
// });
// app.get('/contacts/address/:id', (req, res) => {
//   db.all(`SELECT * FROM Addresses where ContactId = "${req.params.id}"`, (err, rows) => {
//     db.get(`SELECT * from Contacts where id = "${req.params.id}"`, (err, rowsContact) => {
//       res.render('addresses_with_contact', { data: rows, dataContacts: rowsContact });
//     });
//   });
// });
module.exports = router;
