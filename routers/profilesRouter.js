const express = require('express');
const router = express.Router();
const profiles = require('../models/profileModel');
const contacts = require('../models/contactsModel');



// PROFILE ROUTER
// ==================================================================

router.get('/', (req, res) =>
  {
    profiles.leftJoin( (profilesData) =>
      {
        contacts.select( (contactsData) =>
          {
            res.render('profiles', {profilesData : profilesData, contactsData : contactsData, error : false});
          }
        )
      }
    );
  }
);

router.post(`/`, (req, res) =>
  {
    profiles.add(req.body, status =>
      {
        if (!status)
        {
            profiles.leftJoin( (profilesData) =>
              {
                contacts.select( (contactsData) =>
                  {
                    res.render('profiles', {profilesData : profilesData, contactsData : contactsData, error : true});
                  }
                )
              }
            );
        }
        else
        {
          res.redirect(`back`)
        }
      }
    );
  }
);

router.get('/edit/:id', (req, res) =>
  {
    profiles.select( (profileData) =>
      {
        contacts.select( (contactsData) =>
          {
            res.render('profileEdit', {profileData, contactsData})
          }
        )
      },`*`,req.params.id);
  }
);

router.post('/edit/:id', (req, res) =>
  {
    profiles.update(req.body, (report) =>
      {
        if (!report)
        {
          res.redirect('/profiles', {report});
        }
      }
    );
  }
)

router.get('/delete/:id', (req, res) =>
  {
    profiles.deleteQuery(req.params.id);
    res.redirect('/profiles');
  }
)


module.exports = router;
