const router = require('express').Router();
const Profiles = require('../models/profiles');
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  Contacts.findAllContacts((err, contactRecords) => {
    Profiles.findAllProfiles((err, profileRecords) => {
      if (err) throw err;
      res.render('profiles', {
        profiles: profileRecords,
        contacts: contactRecords
      });
    });
  });
});

router.post('/', (req, res) => {
  const dataBody = {
    username: req.body.username,
    password: req.body.password,
    id: req.body.id
  };

  Profiles.createProfiles(dataBody, err => {
    if (err) throw err;
    res.redirect('/profiles');
  });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }

  Profiles.editProfiles(dataBody, (err, data) => {
    if (err) throw err;
    res.render('profiles-edit', data);
  });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    username: req.body.username,
    password: req.body.password
  }

  Profiles.updateProfiles(dataBody, err => {
    if (err) throw err;
    res.redirect('/profiles');
  });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }
  
  Profiles.deleteProfiles(dataBody, err => {
    if (err) throw err;
    res.redirect('/profiles');
  });
});

module.exports = router;