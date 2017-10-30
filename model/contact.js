const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Contact{
    static findAll(callback){ // Lihat semua list
        const query=`SELECT * FROM contacts`;
        db.all(query,(err,rows)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static create(input,callback){ // Tambah data
        const query=`INSERT INTO contacts (name,company,phone,email) VALUES ("${input.name}", "${input.company}", "${input.phone}", "${input.email}")`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else {
                callback(null,this);
            }
        });
    }
    static findById(id,callback){ // Cari data berdasarkan ID
        const query=`SELECT * FROM contacts WHERE id="${id}"`;
        db.all(query,function(err,rows){
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static update(input,callback){ // Update data
        const query=`UPDATE contacts SET name="${input.name}", company="${input.company}", phone="${input.phone}", email="${input.email}" WHERE id="${input.id}"`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
    static remove(id,callback){ // Hapus data
        const query=`DELETE FROM contacts WHERE id="${id}"`;
        db.run(query,function(err){
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
}

module.exports=Contact;
