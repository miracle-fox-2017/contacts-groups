const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Address{
    static findAll(){ // Lihat semua list
        return new Promise((resolve,reject)=>{
            const query=`SELECT * FROM address`;
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
        return new Promise(function(resolve,reject){
            const query=`INSERT INTO address (street,city,zipcode,contact_id) VALUES ("${input.street}", "${input.city}", "${input.zipcode}", "${input.contact}")`;
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
            const query=`SELECT * FROM address WHERE id="${id}"`;
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
            const query=`UPDATE address SET street="${input.street}", city="${input.city}", zipcode="${input.zipcode}", contact_id="${input.contact}" WHERE id="${input.id}"`;
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
            const query=`DELETE FROM address WHERE id="${id}"`;
            db.run(query,function(err){ // Tidak bisa menggunakan arrow function
                if(err){
                    reject(err);
                }else{
                    resolve(this);
                }
            });
        });
    }
    static leftJoinContact(){ // Left Join Address with Contact
        return new Promise((resolve,reject)=>{
            const query=`SELECT address.id, address.street, address.city, address.zipcode, contacts.name FROM address LEFT JOIN contacts ON address.contact_id = contacts.id`;
            db.all(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
}

module.exports=Address;
