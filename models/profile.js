const sqlite3 = require('sqlite3').verbose();

class Profile{
    constructor(dataBaseFileLocation){
        this.tableName = 'Profile';
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
        if(data.username == '' || data.password == ''){
            return null
        }
        else{
        
        let add = `INSERT INTO ${this.tableName}(username,password,ContactID)VALUES("${data.username}","${data.password}","${data.contact_option}")`;
       this.db.run(add,(err,rows)=>{
           if(err){
               return err
           }
           
       })
        
      
    }
}

    removeData(data){
        let del = `DELETE FROM ${this.tableName} WHERE id = ${data}`
        this.db.run(del);
    }
    getDatabyId(data,cb){
        let contact = `SELECT * FROM ${this.tableName} WHERE id = ${data}`;
        this.db.get(contact,(err,rows)=>{
            if(err){
                throw err
            }
            cb(null,rows)
        })
    }
    editData(data){
        let update = `UPDATE ${this.tableName} SET username = "${data.body.username}", password = "${data.body.password}" WHERE id = ${data.params.id}`
        this.db.run(update)
    }


    findAllWithContact(cb){
        // console.log('masuksini--------------------------------')
        let assign = `SELECT Profile.*, Contacts.name FROM Profile LEFT JOIN Contacts on Contacts.id = Profile.contactID`
        this.db.all(assign,(err,rows)=>{
            // console.log(err)
            if(!err){
                console.log('MASUK',rows)
                cb(rows);
            }
            // console.log(err)
        })
    }
}

module.exports = Profile;

