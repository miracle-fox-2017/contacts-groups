// Require
const express = require('express')
const bodyParser = require('body-parser')
const index = require('./routers/index')
const contacts = require('./routers/contacts')
const groups = require('./routers/groups')
const profiles = require('./routers/profiles')
const addresses = require('./routers/addresses')

// Invoke express
const app = express()

// Set ejs
app.set('view engine', 'ejs')

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route
app.use('/', index)
app.use('/contacts', contacts)
app.use('/groups', groups)
app.use('/profiles', profiles)
app.use('/addresses', addresses)

// Port
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
