const sqlite3=require("sqlite3");
const db=new sqlite3.Database("./database/database.db");

class Address{
    static findAll(callback){ // Lihat semua list
        const query=`SELECT * FROM address`;
        db.all(query,(err,rows)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static create(input,callback){ // Tambah data
        const query=`INSERT INTO address (street,city,zipcode,contact_id) VALUES ("${input.street}", "${input.city}", "${input.zipcode}", "${input.contact}")`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else {
                callback(null,this);
            }
        });
    }
    static findById(id,callback){ // Cari data berdasarkan ID
        const query=`SELECT * FROM address WHERE id="${id}"`;
        db.all(query,function(err,rows){
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
    static update(input,callback){ // Update data
        const query=`UPDATE address SET street="${input.street}", city="${input.city}", zipcode="${input.zipcode}", contact_id="${input.contact}" WHERE id="${input.id}"`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
    static remove(id,callback){ // Hapus data
        const query=`DELETE FROM address WHERE id="${id}"`;
        db.run(query,function(err){ // Tidak bisa menggunakan arrow function
            if(err){
                callback(err,null);
            }else{
                callback(null,this);
            }
        });
    }
    static leftJoinContact(callback){ // Left Join Address with Contact
        const query=`SELECT address.id, address.street, address.city, address.zipcode, contacts.name FROM address LEFT JOIN contacts ON address.contact_id = contacts.id`;
        db.all(query,(err,rows)=>{
            if(err){
                callback(err,null);
            }else{
                callback(null,rows);
            }
        });
    }
}

module.exports=Address;
