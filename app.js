const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

const index = require('./routers/index')
app.use('/', index)

const contacts = require('./routers/contacts')
app.use('/contacts', contacts)

const groups = require('./routers/groups')
app.use('/groups', groups)

const addresses = require('./routers/addresses')
app.use('/addresses', addresses)

const profiles = require('./routers/profiles')
app.use('/profiles', profiles)

const addresses_with_contact = require('./routers/addresses_with_contact')
app.use('/addresses_with_contact', addresses_with_contact)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})