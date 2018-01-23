
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const Contact 					= require('./routers/contact')
const Profile 					= require('./routers/profile')
const Group   					= require('./routers/group')
const Address 					= require('./routers/address')
const addresses_with_contact    = require('./routers/addresses_with_contact')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use('/contacts', Contact)
app.use('/groups', Group)
app.use('/addresses', Address)
app.use('/profiles', Profile)
app.use('/addresses_with_contact', addresses_with_contact)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})