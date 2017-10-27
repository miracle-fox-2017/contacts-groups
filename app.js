const express    = require('express')
const bodyParser = require('body-parser')
const sqlite3    = require('sqlite3').verbose()

const db         = new sqlite3.Database('data/database.db')
const app        = express()

//set to load css
app.use(express.static(__dirname + '/views'))
// set the view engine to ejs
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// *** ROUTES

//* START INDEX *//
app.get('/',(req,res)=>{
  res.render('index')
})


app.listen(3000,(err)=>{
  if(!err){console.log(`running your serv in port:3000`);}
})
