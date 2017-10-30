const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Group{
    static findAll(callback){ // Lihat semua list
        const query=`SELECT * FROM groups`;
        db.all(query,(err,rows)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static create(input,callback){ // Tambah data
        const query=`INSERT INTO groups (name_of_group) VALUES ("${input.group}")`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else {
                callback(null,this);
            }
        });
    }
    static findById(id,callback){ // Cari data berdasarkan ID
        const query=`SELECT * FROM groups WHERE id="${id}"`;
        db.all(query,function(err,rows){
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static update(input,callback){ // Update data
        const query=`UPDATE groups SET name_of_group="${input.group}" WHERE id="${input.id}"`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
    static remove(id,callback){ // Hapus data
        const query=`DELETE FROM groups WHERE id="${id}"`;
        db.run(query,function(err){
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
}

module.exports=Group;
