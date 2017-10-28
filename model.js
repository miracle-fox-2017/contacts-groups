const sqlite3 = require('sqlite3').verbose();

class Contacts{
    constructor(dataBaseFileLocation){
        this.tableName = 'Contacts';
        this.db = new sqlite3.Database(dataBaseFileLocation);
    }

    getDatabase(cb){
        let call = `SELECT * FROM ${this.tableName}`;
        this.db.all(call,(err,rows) =>{
            if(err){
                throw err
            }

            cb(rows);
            this.db.close();
        })
    }

    addData(body){
        let add = `INSERT INTO ${this.tableName}(name,company,telp_number,email)VALUES("${body.name}" , "${body.company}" , "${body.telp_number}" , "${body.email}")`;
        this.db.run(add)
    }
    deleteData(data){
        let del = `DELETE FROM ${this.tableName} WHERE id = ${data.id}`;
        this.db.run(del)
    }
}

module.exports = Contacts;