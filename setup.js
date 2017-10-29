const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
 
db.serialize(()=> {
  db.run("create table if not exists Contacts (id integer primary key, name text, company text, telp_number text not null unique, email text not null unique)", err=>{
  	if(err){
  		console.log(err);	
  	}
  });

  db.run("create table if not exists Groups (id integer primary key, name_of_group text unique)", err=>{
  	if(err){
  		console.log(err);
  	}
  })

  db.run("create table if not exists Profile (id integer primary key, username text unique, password text)", err=>{
  	if(err){
  		console.log(err);
  	}
  })

  db.run("create table if not exists Addresses (id integer primary key, street text, city text, zipcode text)", err=>{
  	if(err){
  		console.log(err);
  	}
  })

  db.run('alter table Profile add column id_contact integer references Contacts(id) on delete set null', err=>{
  	if(err){
  		console.log(err);
  	}
  })

  db.run('create unique index if not exists unique_name on Profile(id_contact);', err=>{
  	if(err){ f
  		console.log(err);
  	}
  })
});
 

 
db.close();