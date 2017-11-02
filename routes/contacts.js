const router = require('express').Router();
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  Contacts.findAllContacts()
    .then(records => {
      res.render('contacts', {
        contacts: records
      });
    }).catch(err => {
      console.error(err);
    });
});

router.post('/',  (req, res) => {
  const dataBody = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    company: req.body.company
  };

  Contacts.createContacts(dataBody)
    .then(() => {
      res.redirect('/contacts');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Contacts.editContacts(dataBody)
    .then(data => {
      res.render('contacts-edit', data);
    }).catch(err => {
      console.error(err);
    });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    company: req.body.company
  };

  Contacts.updateContacts(dataBody)
    .then(() => {
      res.redirect('/contacts');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Contacts.deleteContacts(dataBody)
    .then(() => {
      res.redirect('/contacts');
    }).catch(err => {
      console.error(err);
    });
});

module.exports = router;