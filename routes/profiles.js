const router = require('express').Router();
const Profiles = require('../models/profiles');
const Contacts = require('../models/contacts');

router.get('/', (req, res) => {
  let error = '';
  if (req.query.hasOwnProperty('error')) {
    error = 'Your contact already have profile';
  }

  Contacts.findAllContacts()
    .then(contactRecords => {
      Profiles.findAllProfiles()
        .then(profileRecords => {
          res.render('profiles', {
            profiles: profileRecords,
            contacts: contactRecords,
            error: error
          })
        }).catch(err => {
          console.error(err);
        });
    }).catch(err => {
      console.error(err);
    });
});

router.post('/', (req, res) => {
  const dataBody = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
  };

  Profiles.createProfiles(dataBody)
    .then(() => {
      res.redirect('/profiles');
    }).catch(() => {
      res.redirect('/profiles?error=true');
    });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Profiles.editProfiles(dataBody)
    .then(data => {
      res.render('profiles-edit', data);
    }).catch(err => {
      console.error(err);
    });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    username: req.body.username,
    password: req.body.password
  };

  Profiles.updateProfiles(dataBody, err => {
    if (err) throw err;
    res.redirect('/profiles');
  }).then(() => {
    res.redirect('/profiles');
  }).catch(err => {
    console.error(err);
  });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Profiles.deleteProfiles(dataBody, err => {
    if (err) throw err;
    res.redirect('/profiles');
  }).then(() => {
    res.redirect('/profiles');
  }).catch(err => {
    console.error(err);
  });
});

module.exports = router;