const sqlite3 = require('sqlite3').verbose();

class Contacts{
    constructor(dataBaseFileLocation){
        this.tableName = 'Contacts';
        this.db = new sqlite3.Database(dataBaseFileLocation);
    }


    // getDatabase(){
    //     let call = `SELECT * FROM ${this.tableName}`
    //     return new Promise ((resolve,reject) =>{
    //         if(this.db.all(call,(err,rows))){
    //             resolve(rows)
    //         }
    //         else{
    //             reject(err)
    //         }
    //     })
    // }

    getDatabase(cb){
        let call = `SELECT * FROM ${this.tableName}`;
        this.db.all(call,(err,rows) =>{
            if(err){
                throw err
            }

            cb(rows);
            
        })
    }

    addData(body){
        if(body.name == '' || body.email == ''){
            return null
        }
        else{
        let add = `INSERT INTO ${this.tableName}(name,company,telp_number,email)VALUES("${body.name}" , "${body.company}" , "${body.telp_number}" , "${body.email}")`;
        this.db.run(add)
        }
    }
    removeData(data){
        console.log(data)
        let del = `DELETE FROM ${this.tableName} WHERE id = ${data.id}`;
        this.db.run(del)
    }


    // getDataById(data){
    //     console.log('masuk function')
    //     let contact = `SELECT * FROM "${this.tableName}" WHERE id = ${data}`;
    //     return new Promise ((resolve,reject)=>{
    //         if(this.db.all(contact,(err,rows))){
    //             console.log("------------------masuk")
    //             resolve(rows)
    //         }
            
    //     })
    // }



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
        console.log("INI MASUK KE EDIT DATA")
        let update = `UPDATE Contacts SET name = "${data.body.name}" , company = "${data.body.company}" , telp_number = "${data.body.telp_number}" , email = "${data.body.email}" WHERE id = ${data.params.id}`;
        this.db.run(update)
    }
}

module.exports = Contacts;