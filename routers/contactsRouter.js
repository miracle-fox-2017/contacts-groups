const express = require('express');
const router = express.Router();
const contacts = require('../models/contactsModel');

router.get('/', (req, res) =>
  {
    contacts.select( (contactsData) =>
      {
        res.render('contacts', {contactsData})
      }
    );
  }
);

router.post(`/`, (req, res) =>
  {
    contacts.add(req.body);
    res.redirect(`/contacts`);
  }
);

router.get('/edit/:id', (req, res) =>
  {
    contacts.select( (contactData) =>
      {
        res.render('contactEdit', {contactData})
      },`*`,req.params.id);
  }
);

router.post('/edit/:id', (req, res) =>
  {
    contacts.update(req.body);
    res.redirect('/');
  }
)

router.get('/delete/:id', (req, res) =>
  {
    contacts.deleteQuery(req.params.id);
    res.redirect('/');
  }
)


module.exports = router;