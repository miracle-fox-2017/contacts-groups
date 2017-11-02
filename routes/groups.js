const router = require('express').Router();
const Groups = require('../models/groups');

router.get('/', (req, res) => {
  Groups.findAllGroups()
    .then(records => {
      res.render('groups', { groups: records });
    }).catch(err => {
      console.error(err);
    });
});

router.post('/', (req, res) => {
  const dataBody = { name: req.body.name };

  Groups.createGroups(dataBody)
    .then(() => {
      res.redirect('/groups');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/edit/:id', (req, res) => {
  const dataBody = { id: req.params.id };

  Groups.editGroups(dataBody)
    .then(data => {
      res.render('groups-edit', data);
    }).catch(err => {
      console.error(err);
    });
});

router.post('/edit/:id', (req, res) => {
  const dataBody = {
    id: req.params.id,
    name: req.body.name
  };

  Groups.updateGroups(dataBody)
    .then(() => {
      res.redirect('/groups');
    }).catch(err => {
      console.error(err);
    });
});

router.get('/delete/:id', (req, res) => {
  const dataBody = { id: req.params.id };
  
  Groups.deleteGroups(dataBody)
    .then(() => {
      res.redirect('/groups');
    }).catch(err => {
      console.error(err);
    });
});

module.exports = router;