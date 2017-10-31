const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const Contact = require('../models/contacts');

//PROMISE
router.get('/', function (req, res) {
  Profile.findAll(req.body).then((resultProfile) => {
    Contact.findAll(req.body).then((resultContact) => {
      res.render('profiles.ejs', { dataProfile: resultProfile, dataContacts: resultContact });
    });
  });
});

// Delete data profile
router.get('/delete/:id', (req, res) => {
  Profile.delete(req.params.id).then((result) => {
    res.redirect('../../profiles');
  });
});

//menerima input data groups
router.post('/', function (req, res) {
  Profile.create(req.body).then((result) => {
    res.redirect('profiles');
  });
});

// Menampilkan data profile spesifik untuk diubah
router.get('/edit/:id', (req, res) => {
  Profile.editById(req.params.id).then((result) => {
    Contact.findAll(req.body).then((resultContact) => {
      res.render('profileEdit', { data: result, dataContacts: resultContact });
    });
  });
});
router.post('/edit/:id', function (req, res) {
  Profile.update(req.body, req.params).then((result) => {
    res.redirect('../../profiles');
  });
});

// app.get('/profiles/edit/:id', (req, res) => {
//   db.each(`SELECT * FROM Profile WHERE id = ${req.params.id}`, (err, rows) => {
//     db.all('SELECT * FROM Contacts', (err, rowsContact) => {
//       res.render('profileEdit', { data: rows, dataContacts: rowsContact });
//     });
//   });
// });
//
// app.post('/profiles/edit/:id', function (req, res) {
//   db.run(`UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}', ContactId = '${req.body.ContactId}' WHERE id = '${req.params.id}'`, (err) => {
//     res.redirect('../../profiles');
//   });
// });
// app.post('/profiles', function (req, res) {
//   db.run(`INSERT into Profile (username, password, ContactId) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.ContactId}')`, (err, rows) => {
//     res.redirect('profiles');
//   });
// });
// app.get('/profiles/delete/:id', (req, res) => {
//   db.run(`DELETE from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
//     res.redirect('../../profiles');
//   });
// });
// router.get('/', (req, res) => {
//   Profile.findAll(dataProfile => {
//     Contact.findAll(dataContacts => {
//       res.render('profiles.ejs', { dataProfile: dataProfile, dataContacts: dataContacts });
//     });
//   });
// });

module.exports = router;
