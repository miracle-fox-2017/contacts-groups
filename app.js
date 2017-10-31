const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Router
const Contact = require('./router/contact')
const Group = require('./router/group')
const Address = require('./router/address')
const Profile = require('./router/profile')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('views', './views')//renderer
app.set('view engine', 'ejs');


// Contacts
app.use(Contact);

// Groups
app.use(Group)

// Addresses
app.use(Address)

// Profiles
app.use(Profile)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
