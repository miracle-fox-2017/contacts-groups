const express=require('express');
const app = express();
const bodyParser =require('body-parser')



//require FILE router
const contact = require('./routers/contact')
const group =require('./routers/group')
const address=require('./routers/address')
const profile=require('./routers/profile')
const home = require('./routers/home')
const addresscontact = require('./routers/addresscontact')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.set('views','./views')
app.set('view engine','ejs')


//HOME===============================================
app.use('/',home)
//CONTACTS=======================================================//

app.use(contact)


//GROUPS======================================================

app.use(group)

//Addresses===================================================
app.use(address)

//PROFILES======================================================
app.use(profile)

//Address with contact================================
app.use(addresscontact)







app.listen(3000)
