const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Profile{
    static findAll(callback){ // Lihat semua list
        const query=`SELECT * FROM profile`;
        db.all(query,(err,rows)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static create(input,callback){ // Tambah data
        const query=`INSERT INTO profile (username,password,contact_id) VALUES ("${input.username}", "${input.password}", "${input.contact}")`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else {
                callback(null,this);
            }
        });
    }
    static findById(id,callback){ // Cari data berdasarkan ID
        const query=`SELECT * FROM profile WHERE id="${id}"`;
        db.all(query,function(err,rows){
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static update(input,callback){ // Update data
        const query=`UPDATE profile SET username="${input.username}", password="${input.password}", contact_id="${input.contact}" WHERE id="${input.id}"`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
    static remove(id,callback){ // Hapus data
        const query=`DELETE FROM profile WHERE id="${id}"`;
        db.run(query,function(err){
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
    static leftJoinContact(callback){
        const query=`SELECT profile.username, profile.password, profile.id, contacts.name FROM profile LEFT JOIN contacts ON profile.contact_id = contacts.id`;
        db.all(query,function(err,rows){
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static checkUniqueContact(input,callback){
        const query=`SELECT * FROM profile WHERE contact_id="${input}"`;
        db.all(query,(err,row)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,row);
            }
        });
    }
}

module.exports=Profile;
