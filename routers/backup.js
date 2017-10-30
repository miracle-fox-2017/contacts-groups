// Profile read
router.get('/', (req, res) => {
  db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.contactId, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contactId = Contacts.id ORDER BY Profile.contactId`, (err, profiles) => {
    db.all(`SELECT Contacts.id, Contacts.name FROM Contacts`, (err, contactname) => {
      res.render('profile', {data:profiles, error: '', contactname: contactname})
    })
  })
})

// Profile add
router.post('/', (req, res) => {
  db.all(`INSERT INTO Profile (username, password, contactId) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.contactId}')`, (err) => {
    if(err) {
      db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.contactId, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contactId = Contacts.id ORDER BY Profile.contactId`, (err, profiles) => {
        db.all(`SELECT Contacts.id, Contacts.name FROM Contacts`, (err, contactname) => {
          console.log(req.body);
          res.render('profile', {data:profiles, error: 'Your contact already have profile', contactname: contactname})
        })
      })
    }
    else {
      res.redirect('profiles')
    }
  })
})

router.get('/delete/:id', (req, res) => {
  db.all(`DELETE FROM Profile WHERE id = "${req.params.id}"`)
  res.redirect('/profiles')
})


router.get('/edit/:id', (req, res) => {
  db.all(`SELECT Profile.id, Profile.username, Profile.password, Profile.contactId, Contacts.name FROM Profile LEFT JOIN Contacts ON Profile.contactId = Contacts.id WHERE Profile.id = "${req.params.id}"`, (err, profiles) => {
    db.all(`SELECT Contacts.id, Contacts.name FROM Contacts`, (err, contactname) => {
      res.render('profileedit', {data: profiles, error: '', contactname: contactname})
    })
  })
})



router.post('/edit/:id', (req, res) => {
  db.all(`UPDATE Profile SET username = "${req.body.username}", password = "${req.body.password}", contactId = "${req.body.contactId}" WHERE id = "${req.params.id}"`)
  res.redirect('/profiles')
})



router.get('/', (req, res) => {
  db.all(`SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id ORDER BY Addresses.contactId`, (err, addresses) => {
    db.all(`SELECT Contacts.id, Contacts.name FROM Contacts`, (err, contact) => {
      res.render('addresses', {data: addresses, contact: contact})
    })
  })
})

router.post('/', (req, res) => {
  db.all(`INSERT INTO Addresses (street, city, zipcode, ContactId) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}', '${req.body.ContactId}')`)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res) => {
  db.all(`SELECT Addresses.id, Addresses.street, Addresses.city, Addresses.zipcode, Addresses.ContactId, Contacts.name FROM Addresses LEFT JOIN Contacts ON Addresses.ContactId = Contacts.id WHERE Addresses.id = "${req.params.id}"`, (err, addresses) => {
    db.all(`SELECT Contacts.id, Contacts.name FROM Contacts`, (err, contact) => {
      res.render('addressesedit', {data: addresses, contact: contact})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  db.all(`UPDATE Addresses SET street = "${req.body.street}", city = "${req.body.city}", zipcode = "${req.body.zipcode}", ContactId = "${req.body.ContactId}" WHERE id = "${req.params.id}"`, (err) => {
    console.log(err)
    console.log(req.body);
  })
  res.redirect('/addresses')
})

router.get('/', (req, res) => {
  db.all(`SELECT * FROM Groups`, (err, groups) => {
    db.all(`SELECT ContactsGroups.ContactId, Contacts.name, ContactsGroups.GroupId FROM ContactsGroups LEFT JOIN Contacts ON ContactsGroups.ContactId = Contacts.id`, (err, contact) => {
      contact = contact.filter((elemen) => {
        if(elemen.name == null) {
          return false
        }
        else {
          return true
        }
      })
      for(var i = 0; i < groups.length; i++) {
        var tampung = []
        contact.forEach((elemen) => {
          if(groups[i].id == elemen.GroupId) {
            tampung.push(elemen.name)
          }
        })
        groups[i].groups = [...new Set(tampung)].join(',')
      }
      // res.send(groups)
      res.render('groups', {data: groups})
    })
  })
})

static create(body, callback) {
  db.all(`INSERT INTO Groups (name_of_group) VALUES ("${body.name_of_group}")`)
}
