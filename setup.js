const sqlite3 = require('sqlite3').verbose()
const db      = new sqlite3.Database('data/database.db')

//* create table + validasi
function createTable(){
  db.run(`create table if not exists Contacts(
    id integer primary key,
    name text,
    company text,
    telp_number text,
    email text
  )`,(err)=>{
    if(err){console.log(err,'create Contacts');}
  })
  db.run(`create table if not exists Groups(
    id integer primary key,
    name_of_group text
  )`,(err)=>{
    if(err){console.log(err,'create Groups');}
  })
  db.run(`create table if not exists Profile(
    id integer primary key,
    username text,
    password text
  )`,(err)=>{
    if(err){console.log(err,'create Profile');}
  })
  db.run(`create table if not exists Addresses(
    id integer primary key,
    street text,
    city text,
    zipcode integer
  )`,(err)=>{
    if(err){console.log(err,'create Addresses');}
  })
  console.log('>>> success create all table <<<');
}

// createTable()

// release 3
function contacts_profile(){
  let alterContact_Profile = `alter table Profile add column contact_id integer references Contacts(‘id’)`
  db.run(alterContact_Profile,(err)=>{
    if(err){
      console.log(err,'alter table contacts profile');
    }
  })
}
// contacts_profile()

function createUNIQUE(){
  let query = `create unique index contactUnique on Profile(contact_id)`
  db.run(query,(err)=>{
    if(err){
      console.log(err,'create unique index contactUnique');
    }else{
      console.log('success create unique index contactUnique');
    }
  })
}
// createUNIQUE()

// release 6
function address_profile(){
  let query = `alter table Addresses add column contact_id integer references Contacts('id')`
  db.run(query,(err)=>{
    if(err){
      console.log(err,'alter table addresses contacts');
    }else{
      console.log('table addresses contacts altered');
    }
  })
}
// address_profile()

// release 9
function many_to_many(){
  let query_many_to_many = `create table if not exists ConjContactGroup(
    id integer primary key autoincrement,
    id_contacts integer references Contacts('id'),
    id_groups integer references Groups('id')
  )`

  db.run(query_many_to_many,(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('many_to_many created');
    }
  })
}

// many_to_many()
