const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Contact = require('./models/modelContact')
const Group = require('./models/modelGroup')
const Profile = require('./models/modelProfile')
const Address = require('./models/modelAddress')
const ContactGroup = require('./models/modelContactGroup')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Index
app.get('/', function (req, res) {
    res.render('index')
})

//Group
app.get('/groups', function (req, res) {
    Group.getData((data) => {
        ContactGroup.getGroupContact((data), (dataGroup) => {
            res.render('group', { dataGroup: dataGroup })
        })
    })
})

app.get('/groups/add', function (req, res) {
    res.render('group-add')
})

app.post('/groups/add', function (req, res) {
    Group.addData(req.body)
    res.redirect('../groups')
})

app.get('/groups/edit/:id', function (req, res) {
    Group.getDataById((data) => {
        res.render('group-edit', { dataGroup: data })
    }, req.params.id)
})

app.post('/groups/edit/:id', function (req, res) {
    Group.updateData(req.params.id, req.body)
    res.redirect('../../groups')
})

app.get('/groups/delete/:id', function (req, res) {
    Group.deleteData(req.params.id)
    res.redirect('../../groups')
})


//Contact
app.get('/contacts', function (req, res) {
    Contact.getData((data) => {
        ContactGroup.getContactGroup((data), (dataResult) => {
            res.render('contact', { dataContact: dataResult })
        })
    })
})

app.get('/contacts/add', function (req, res) {
    Group.getData((data) => {
        res.render('contact-add', { message: '', dataGroup: data })
    })

})
app.post('/contacts/add', function (req, res) {
    if (req.body.name === '') {
        res.render('contact-add', { message: "Name required!" })
    } else {
        Contact.addData(req.body, (lastId) => {
            ContactGroup.addData(req.body.idGroup, lastId)
            res.redirect('../contacts')
        })

    }

})

app.get('/contacts/edit/:id', function (req, res) {
    Contact.getDataById((data) => {
        res.render('contact-edit', { dataContact: data })
    }, req.params.id)
})

app.post('/contacts/edit/:id', function (req, res) {
    Contact.updateData(req.params.id, req.body)
    res.redirect('../../contacts')
})
app.get('/contacts/delete/:id', function (req, res) {
    Contact.deleteData(req.params.id)
    res.redirect('../../contacts')
})

//Profile
app.get('/profiles', function (req, res) {
    Profile.getData((data) => {
        res.render('profile', { dataProfile: data })
    })
})
app.get('/profiles/add', function (req, res) {
    Contact.getData((data) => {
        res.render('profile-add', { dataContact: data, message: '' })
    })

})
app.post('/profiles/add', function (req, res) {
    Profile.addData((err) => {
        if (err) {
            Contact.getData((data) => {
                res.render('profile-add', { dataContact: data, message: 'Your contact already has profile' })
            })
        } else {
            res.redirect('../profiles')
        }
    }, req.body)

})

app.get('/profiles/edit/:id', function (req, res) {
    Profile.getDataById((dataProfile) => {
        Contact.getData((dataContact) => {
            res.render('profile-edit', { dataProfile: dataProfile, dataContact: dataContact, message: '' })
        })

    }, req.params.id)
})
app.post('/profiles/edit/:id', function (req, res) {
    Profile.updateData((err) => {
        if (err) {
            Profile.getDataById((dataProfile) => {
                Contact.getData((dataContact) => {
                    res.render('profile-edit', { dataProfile: dataProfile, dataContact: dataContact, message: 'Your contact already has profile' })
                })
            }, req.params.id)
        } else {
            res.redirect('../../profiles')
        }
    }, req.params.id, req.body)
})
app.get('/profiles/delete/:id', function (req, res) {
    Profile.deleteData(req.params.id)
    res.redirect('../../profiles')
})

//Addresses
app.get('/addresses', function (req, res) {
    Address.getData((err, dataAddress) => {
        if (err) {
            res.render('address', { Error: err })

        } else {
            Contact.getData((dataContact) => {
                res.render('address', { dataAddress: dataAddress, dataContact: dataContact })
            })
        }
    })
})
app.get('/addresses/add', function (req, res) {
    Contact.getData((dataContact) => {
        res.render('address-add', { dataContact: dataContact })
    })

})
app.post('/addresses/add', function (req, res) {
    Address.addData(req.body)
    res.redirect('../../addresses')
})
app.get('/addresses/edit/:id', function (req, res) {
    Address.getDataById((data) => {
        Contact.getData((dataContact) => {
            res.render('address-edit', { dataAddress: data, dataContact: dataContact })
        })
    }, req.params.id)
})
app.post('/addresses/edit/:id', function (req, res) {
    Address.updateData(req.params.id, req.body)
    res.redirect('../../addresses')
})
app.get('/addresses/delete/:id', function (req, res) {
    Address.deleteData(req.params.id)
    res.redirect('../../addresses')
})

//Addresses with contact
app.get('/contacts/addresses/:id', function (req, res) {
    Contact.getDataById((data) => {
        Address.getDataAddressContact((dataAddress) => {
            res.render('address-contact', { dataContact: data, dataAddress: dataAddress })
        }, data.id)
    }, req.params.id)
})

app.get('/addresses-with-contact', function (req, res) {
    Address.getData((err, dataAddress) => {
        Contact.getData((dataContact) => {
            res.render('address-with-contact', { dataAddress: dataAddress, dataContact: dataContact })
        })
    })
})

app.get('/groups/assign_contacts/:id', function (req, res) {

    Group.getDataById((data) => {
        Contact.getData((dataContact) => {
            res.render('group-contact', { dataGroup: data, dataContact: dataContact })
        })
    }, req.params.id)
})
app.post('/groups/assign_contacts/:id', function (req, res) {
    ContactGroup.addData(req.params.id, req.body.idContact)
    res.redirect('../../groups')
})

app.listen(3000, function (err) {
    console.log("haloooooo")
})