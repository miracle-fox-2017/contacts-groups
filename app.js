const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Contact = require('./models/modelContact')
const Group = require('./models/modelGroup')

const Address = require('./models/modelAddress')
const ContactGroup = require('./models/modelContactGroup')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const index = require('./routes/index')
const contact = require('./routes/contact')
const profile = require('./routes/profile')
const address = require('./routes/address')
const group = require('./routes/group')

app.use('/', index)
app.use('/contacts', contact)
app.use('/profiles', profile)
app.use('/addresses', address)
app.use('/groups', group)


app.get('/addresses-with-contact', function (req, res) {
    Address.getData((err, dataAddress) => {
        Contact.getData((dataContact) => {
            res.render('address-with-contact', { dataAddress: dataAddress, dataContact: dataContact })
        })
    })
})



app.listen(3000, function (err) {
    console.log("haloooooo")
})