const sqlite3 = require('sqlite3').verbose();
const ContactDB = require('../models/contacts')
let contact = new ContactDB('database.db')
class Address{
    constructor(dataBaseFileLocation){
        this.tableName = 'Addresses';
        this.db = new sqlite3.Database(dataBaseFileLocation);
    }

    getDatabase(cb){
        let call = `SELECT * FROM ${this.tableName}`;
        this.db.all(call,(err,rows) =>{
            if(err){
                throw err
            }

            cb(rows);
            
        })
    }

    addData(data){

        let add = `INSERT INTO ${this.tableName}(street,city,zipcode,ContactID)VALUES("${data.body.street}","${data.body.city}","${data.body.zipcode}","${data.body.Contact}")`;
        // console.log(add)
        this.db.run(add)
    }
    removeData(data){
        console.log(data)
        let del = `DELETE FROM ${this.tableName} WHERE id = ${data}`;
        this.db.run(del)
    }
    getDataById(data,cb){
        console.log(data)
        let contact = `SELECT * FROM "${this.tableName}" WHERE id = ${data}`;
        this.db.get(contact,(err,rows)=>{
            if(err){
                throw err
            }
            cb(null, rows)
            
    }
)
    }


    editData(data){
        let update = `UPDATE ${this.tableName} SET street = "${data.body.street}", city = "${data.body.city}", zipcode = "${data.body.zipcode}", ContactID = "${data.body.Contact}" WHERE id = ${data.params.id}`
        this.db.run(update)
    }

    findAllWithContact(cb){
        // console.log('masuksini--------------------------------')
        let assign = `SELECT Addresses.*,Contacts.name FROM Addresses left join Contacts on Contacts.id = Addresses.ContactID`        
        this.db.all(assign,(err,rows)=>{
            // console.log(err)
            if(!err){
                console.log('MASUK',rows)
                cb(rows);
            }
            // console.log(err)
        })
    }

    //release 8
    findAddressWithContact(req,cb){
        let arrName = [];
        contact.getDataById(req.params.id,contactData =>{
            this.getDatabase(data =>{
                console.log(contactData)
                data.forEach(dataIndex=>{
                    if(dataIndex.id == contactData.id){
                        arrName.push(dataIndex)
                    }
                })
                      
            })
            console.log(arrName)
            cb(arrName);
        })
        
    }
    
}

module.exports = Address;