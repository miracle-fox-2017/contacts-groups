const sqlite3 = require('sqlite3').verbose();

class Groups{
    constructor(dataBaseFileLocation){
        this.tableName = 'Groups';
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
        let add = `INSERT INTO ${this.tableName}(name_of_group)VALUES("${data.body.name_of_group}")`;
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
        console.log("INI MASUK KE EDIT DATA")
        let update = `UPDATE Groups SET name_of_group = "${data.body.name_of_group}" WHERE id = ${data.params.id}`;
        console.log(update)
        this.db.run(update)
    }
}

module.exports = Groups;