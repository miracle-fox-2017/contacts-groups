const express = require ('express')
const bodyParser = require('body-parser')
const ContactsDB = require('./model')
let contacts = new ContactsDB('./database.db')
const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('views', './view')
app.set('view engine', 'ejs')



//homepage
app.get('/',function(req, res){
    res.render('home')
  })

//contactPage
//get database
app.get('/contacts',(req,res) =>{
    contacts.getDatabase((rows)=>{
        res.render('contacts', {rows : rows})
    })
})
//add data
app.post('/contacts',(req,res) =>{
    contacts.addData(req.body);
    res.redirect('/contacts')
})
//delete data
app.get('/contacts/delete/:id',(req,res) =>{
    contacts.deleteData({id: req.params.id});
    res.redirect('/contacts/');
})


app.listen(3000,function(){
    console.log('Sample app listening on port 3000!')
  })