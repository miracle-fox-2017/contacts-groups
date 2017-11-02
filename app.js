const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Router
const contact = require('./router/contact')
const group = require('./router/group')
const address = require('./router/address')
const profile = require('./router/profile')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', './views')//renderer
app.set('view engine', 'ejs');


// Contacts
app.use(contact);

// Groups
app.use(group)

// Addresses
app.use(address)

// Profiles
app.use(profile)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
