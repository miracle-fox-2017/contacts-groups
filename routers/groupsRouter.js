const express = require('express');
const router = express.Router();
const groups = require('../models/groupsModel');



// GROUP ROUTER
// ==============================================================================

router.get('/', (req, res) =>
  {
    groups.select( (groupsData) =>
      {
        res.render('groups', {groupsData})
      }
    );
  }
);

router.post(`/`, (req, res) =>
  {
    groups.add(req.body);
    res.redirect(`/groups`);
  }
);

router.get('/edit/:id', (req, res) =>
  {
    groups.select( (groupData) =>
      {
        res.render('groupEdit', {groupData})
      },`*`,req.params.id);
  }
);

router.post('/edit/:id', (req, res) =>
  {
    groups.update(req.body);
    res.redirect('/groups');
  }
)

router.get('/delete/:id', (req, res) =>
  {
    groups.deleteQuery(req.params.id);
    res.redirect('/groups');
  }
)


module.exports = router;