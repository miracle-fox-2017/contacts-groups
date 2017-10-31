const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Profile{
    static findAll(){ // Lihat semua list
        return new Promise((resolve,reject)=>{
            const query=`SELECT * FROM profile`;
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
            const query=`INSERT INTO profile (username,password,contact_id) VALUES ("${input.username}", "${input.password}", "${input.contact}")`;
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
        return new Promise((resolve,reject)=>{
            const query=`SELECT * FROM profile WHERE id="${id}"`;
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
            const query=`UPDATE profile SET username="${input.username}", password="${input.password}", contact_id="${input.contact}" WHERE id="${input.id}"`;
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
            const query=`DELETE FROM profile WHERE id="${id}"`;
            db.run(query,function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(this);
                }
            });
        });
    }
    static leftJoinContact(){
        return new Promise((resolve,reject)=>{
            const query=`SELECT profile.username, profile.password, profile.id, contacts.name FROM profile LEFT JOIN contacts ON profile.contact_id = contacts.id`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
    static checkUniqueContact(input){
        return new Promise((resolve,reject)=>{
            const query=`SELECT * FROM profile WHERE contact_id="${input}"`;
            db.all(query,(err,row)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(row);
                }
            });
        });
    }
}

module.exports=Profile;
