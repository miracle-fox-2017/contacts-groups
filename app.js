const express = require ('express')
const bodyParser = require('body-parser')



const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('views', './view')
app.set('view engine', 'ejs')



//homepage
app.get('/',function(req, res){
    res.render('home')
  })

//contactsPage

const contacts = require('./routers/contacts')
app.use('/contacts',contacts)

//groupPage

const groups = require('./routers/group')
app.use('/groups',groups)

//addressPage

const address = require('./routers/address')
app.use('/address',address)

//profilePage

const profile = require('./routers/profile')
app.use('/profile',profile)

app.listen(3000,function(){
    console.log('Sample app listening on port 3000!')
  })