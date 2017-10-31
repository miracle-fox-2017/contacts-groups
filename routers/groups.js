const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
const Group = require('../models/groups');
const ContactsGroups = require('../models/contacts_groups');

// menampilkan data groups
//PROMISE
router.get('/', function (req, res) {
  Group.findAll(req.body).then((resultGroup) => {
    ContactsGroups.findName(req.body).then((resultContactGroup) => {
      Contact.findAll(req.body).then((resultContact) => {
        res.render('groups.ejs', { dataGroups: resultGroup, dataContacts: resultContact, dataContactsGroups: resultContactGroup });
      });
    });
  });
});

// Delete data group
router.get('/delete/:id', (req, res) => {
  Group.delete(req.params.id).then((result) => {
    res.redirect('../../groups');
  });
});

//menerima input data groups
router.post('/', function (req, res) {
  Group.create(req.body).then((result) => {
    res.redirect('groups');
  });
});

// Menampilkan data group spesifik untuk diubah
router.get('/edit/:id', (req, res) => {
  Group.editById(req.params.id).then((result) => {
    res.render('groupEdit', { data: result });
  });
});
router.post('/edit/:id', function (req, res) {
  Group.update(req.body, req.params).then((result) => {
    res.redirect('../../groups');
  });
});

// Menampilkan data groupsContact spesifik untuk diubah
// router.get('/assign_contacts/:id', (req, res) => {
//   Group.editById(req.params.id).then((resultGroup) => {
//     ContactsGroups.findConjunction((resultContactGroup) => {
//       res.render('assign_contacts', { data: resultGroup, dataContacts: resultContactGroup });
//     });
//   });
// });
// router.post('/assign_contacts/:id', function (req, res) {
//   ContactsGroups.create(req.body).then((resultContactGroup) => {
//     res.redirect('../../groups');
//   });
// });

// app.get('/groups/assign_contacts/:id', function (req, res) {
//   db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
//     db.all('SELECT C.id, C.name, C.company, C.telp_number, C.email, G.name_of_group FROM Contacts as C LEFT JOIN ContactsGroups as CG ON C.id = CG.ContactId LEFT JOIN Groups as G on G.id = CG.GroupId', (err, rowsContact) => {
//       // console.log(rows);
//       res.render('assign_contacts', { data: rows, dataContacts: rowsContact });
//     });
//   });
// });
//
// app.post('/groups/assign_contacts/:id', function (req, res) {
//   // db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`, function (err, rows2) {
//   //   let id = this.lastID;
//   // console.log(req.body);
//   // console.log(req.params.id);
//     db.run(`INSERT into ContactsGroups (ContactId, GroupId) VALUES ('${req.body.name}', '${req.params.id}')`, (err, rows) => {
//       // console.log(err);
//       res.redirect('/groups');
//     });
//   });
// app.get('/groups/edit/:id', (req, res) => {
//   db.each(`SELECT * FROM Groups WHERE id = ${req.params.id}`, (err, rows) => {
//     res.render('groupEdit', { data: rows });
//   });
// });
// app.post('/groups/edit/:id', function (req, res) {
//   db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = '${req.params.id}'`, (err) => {
//     res.redirect('../../groups');
//   });
// });
// app.post('/groups', function (req, res) {
//   db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, (err, rows) => {
//     res.redirect('groups');
//   });
// });
// app.get('/groups/delete/:id', (req, res) => {
//   db.run(`DELETE from Groups WHERE id = "${req.params.id}"`, (err, rows) => {
//     res.redirect('../../groups');
//   });
// });
// router.get('/', function (req, res) {
//   Group.findAll(dataGroups => {
//     ContactsGroups.findName(dataContactsGroups => {
//       Contact.findAll(dataContacts => {
//         res.render('groups.ejs', { dataGroups: dataGroups, dataContacts: dataContacts, dataContactsGroups: dataContactsGroups });
//       });
//     });
//   });
// });

module.exports = router;
