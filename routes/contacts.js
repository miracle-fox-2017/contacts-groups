const router = require('express').Router();
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  Contacts.findAllContacts((err, records) => {
    if (err) throw err;
    res.render('contacts', {contacts: records});
  });
});

router.post('/',  (req, res) => {
  const dataBody = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    company: req.body.company
  };

  Contacts.createContacts(dataBody, err => {
    if (err) throw err;
    res.redirect('/contacts');
  });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }

  Contacts.editContacts(dataBody, (err, data) => {
    if (err) throw err;
    res.render('contacts-edit', data);
  });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    company: req.body.company
  }

  Contacts.updateContacts(dataBody, err => {
    if (err) throw err;
    res.redirect('/contacts');
  });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }

  Contacts.deleteContacts(dataBody, err => {
    if (err) throw err;
    res.redirect('/contacts');
  });
});

module.exports = router;