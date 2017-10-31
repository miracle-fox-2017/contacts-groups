const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Group{
    static findAll(){ // Lihat semua list
        return new Promise((resolve,reject)=>{
            const query=`SELECT * FROM groups`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static create(input){ // Tambah data
        return new Promise((resolve,reject)=>{
            const query=`INSERT INTO groups (name_of_group) VALUES ("${input.group}")`;
            db.run(query,function(err){ // Tidak bisa menggunakan arrow function
                if(err){
                    reject(err);
                }else {
                    resolve(this);
                }
            });
        });
    }
    static findById(id){ // Cari data berdasarkan ID
        return new Promise((resolve, reject)=>{
            const query=`SELECT * FROM groups WHERE id="${id}"`;
            db.all(query,function(err,rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static update(input){ // Update data
        return new Promise((resolve,reject)=>{
            const query=`UPDATE groups SET name_of_group="${input.group}" WHERE id="${input.id}"`;
            db.run(query,function(err){ // Tidak bisa menggunakan arrow function
                if(err){
                    reject(err);
                }else{
                    resolve(this);
                }
            });
        });
    }
    static remove(id){ // Hapus data
        return new Promise((resolve,reject)=>{
            const query=`DELETE FROM groups WHERE id="${id}"`;
            db.run(query,function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(this);
                }
            });
        });
    }
}

module.exports=Group;
