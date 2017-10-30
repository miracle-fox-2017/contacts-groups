const router = require('express').Router();
const Groups = require('../models/groups');

router.get('/', (req, res) => {
  Groups.findAllGroups((err, records) => {
    if (err) throw err;
    res.render('groups', {groups: records});
  });
});

router.post('/', (req, res) => {
  const dataBody = {
    name: req.body.name
  };

  Groups.createGroups(dataBody, err => {
    if (err) throw err;
    res.redirect('/groups');
  });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }

  Groups.editGroups(dataBody, (err, data) => {
    if (err) throw err;
    res.render('groups-edit', data);
  });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    name: req.body.name
  }

  Groups.updateGroups(dataBody, err => {
    if (err) throw err;
    res.redirect('/groups');
  });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = {
    id: req.params.id
  }
  
  Groups.deleteGroups(dataBody, err => {
    if (err) throw err;
    res.redirect('/groups');
  });
});

module.exports = router;