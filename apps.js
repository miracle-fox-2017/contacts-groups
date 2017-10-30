const express = require ('express')
const bodyParser = require ('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('Views', './Views') // specify the views directory
app.set('view engine', 'ejs')

const index    = require ('./Route/index')
const groups   = require ('./Route/groups')
const contacts = require ('./Route/contacts')
const address = require ('./Route/addresses')
const profile = require ('./Route/profile')
const addwithcontact = require ('./Route/addresseswithcontact')

app.use('/',index)
app.use('/groups',groups)
app.use('/contacts',contacts)
app.use('/address',address)
app.use('/profile',profile)
app.use('/addresses_with_contact',addwithcontact)

app.listen('3000',()=>{
  console.log('Testing Berjalan');
})
