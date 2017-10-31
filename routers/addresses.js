const express = require('express');
const router = express.Router();
const Address = require('../models/addresses');
const Contact = require('../models/contacts');

//menampilkan semua data address
//PROMISE
router.get('/', function (req, res) {
  Address.findAll(req.body).then((resultAddress) => {
    Contact.findAll(req.body).then((resultContact) => {
      res.render('addresses.ejs', { dataAddress: resultAddress, dataContacts: resultContact });
    });
  });
});

// router.get('/', (req, res) => {
//   Address.findAll(dataAddress => {
//     Contact.findAll(dataContacts => {
//       res.render('addresses.ejs', { dataAddress: dataAddress, dataContacts: dataContacts });
//     });
//   });
// });

// // //menerima input data address
//Callback
// router.post('/', (req, res) => {
//   Address.create(req, dataAddress => {
//     res.redirect('/addresses');
//   });
// });

//PROMISE
router.post('/', (req, res) => {
  Address.create(req.body).then((result)=> {
    res.redirect('/addresses');
  });
});

router.get('/edit/:id', (req, res) => {
  Address.editById(req.params.id).then((resultAddress) => {
    Contact.findAll(req.body).then((resultContact) => {
      res.render('addressEdit.ejs', { dataAddress: resultAddress, dataContacts: resultContact });
    });
  });
});
router.post('/edit/:id', function (req, res) {
  Address.update(req.body, req.params).then((result) => {
    res.redirect('../../addresses');
  });
});

// Delete data address
router.get('/delete/:id', (req, res) => {
  Address.delete(req.params.id).then((result) => {
    res.redirect('../../addresses');
  });
});

// app.get('/addresses/delete/:id', (req, res) => {
//   db.run(`DELETE from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
//     res.redirect('../../addresses');
//   });
// });
// app.get('/addresses/edit/:id', (req, res) => {
//   db.each(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, (err, rows) => {
//     db.all('SELECT * FROM Contacts', (err, rowsContact) => {
//       res.render('addressEdit', { data: rows, dataContacts: rowsContact });
//     });
//   });
// });
// app.post('/addresses/edit/:id', function (req, res) {
//   db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}', ContactId = '${req.body.ContactId}' WHERE id = '${req.params.id}'`, (err) => {
//     res.redirect('../../addresses');
//   });
// });

module.exports = router;
