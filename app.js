const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/data.db');
const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/contacts',function(req,res){
  db.all(`SELECT * FROM Contacts`,function(err,rows){
    if(err){
      console.log(err)
    }else{
      //console.log(rows[0].name)
      res.render('contacts',{rows:rows})

    }
  })
})
app.post('/contacts',function(req,res){
  //db.all(`INSERT INTO Contacts (name,company,telp_number,email)
          //VALUES()`)
})

app.get('/edit/:id',function(req,res){
  //console.log(req.params.id)
  res.render('edit')
})

app.listen(3000,function(){
})
