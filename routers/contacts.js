const express = require ('express')
const bodyParser = require('body-parser')
const ContactsDB = require('../models/contacts')

let contacts = new ContactsDB('database.db')
const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('views', './view')
app.set('view engine', 'ejs')



const router = express.Router()

//contactPage
//get database
router.get('/',(req,res) =>{
    contacts.getDatabase((rows)=>{
        if(req.query.hasOwnProperty('error')){
            msg = 'nama tidak boleh kosong'
         }else{
            msg = null
         }
        res.render('contacts', {rows : rows,msgObj:msg})
    })
})
//add data
router.post('/',(req,res) =>{
    if(contacts.addData(req.body)==null){
        res.redirect('/contacts?error=true')
    }
    
    res.redirect('/contacts')
})
//delete data
router.get('/delete/:id',(req,res) =>{
    contacts.removeData({id: req.params.id});
    res.redirect('/contacts/');
})
//edit Data
router.get('/edit/:id',(req,res) =>{
    contacts.getDataById((req.params.id),function(err,rowID){
        if(!err){
            
            res.render('contactsedit',{data: rowID})
            console.log(rowID)
        }
        else{
            // console.log(err);
            // console.log(rowID)
        }
    })
})

router.post('/edit/:id',(req,res)=>{
    
    // let data = req.body
    // res.send()
    contacts.editData(req) //=>{
        res.redirect('/contacts')
    // })

}
)





module.exports = router