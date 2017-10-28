const sqlite3   = require('sqlite3');
const db        = new sqlite3.Database('./database/database.db');
const tableName = `Contacts`;


/*
  variabel statement dan command untuk digunakan sebagai tempat penampungan di fungsi lain, statement digunakan untuk menyimpan query
  command digunakan untuk membedakan beberapa perintah
  properties digunakan untuk memasukkan data, jika ada penambahan kolom, cukup tambahkan di array properties, tidak perlu melakukan perubahan kode dibawahnya
  fill digunakan untuk menyimpan value yang diterima, masing masing fungsi yang memerlukan sudah melakukan pemecahan object sendiri
  columnNames digunakan untuk menyimpan nama kolom dalam tabel
*/

let statement = ``;
let command = ``;
let properties = ['name', `company`, 'telp_number', 'email'];
let fill = ``;
let columnNames = ``;

/*
  function add
  parameter : group object
  creating statement to be passed on to execute function
*/

let add = (Obj) =>
{
  for (let i = 0; i < properties.length - 1 ; i++)
  {
    columnNames += `${properties[i]}, `
    fill += ` "${Obj[properties[i]]}", `
  }
  
  columnNames += `${properties[properties.length - 1]}`;
  fill += `"${Obj[properties[properties.length - 1]]}"`
  
  command = `INSERT`;
  statement = `INSERT INTO ${tableName} (${columnNames}) VALUES (${fill})`;
  
  console.log(statement);
  
  db.run(statement);
  resetAll();
}

/*
  function select
  parameter : callback [column], id
  creating a query to be passed on to execute function, the callback is used to retrieve the data, the colum field is optional, default option is '*', id is used to find specific record
*/

let select = (callback, column = `*`, id) =>
{
  command = `SELECT`;
  statement = `SELECT ${column} FROM ${tableName}`
  if (id)
  {
    command = `WHERE`
    statement += ` WHERE ID = ${id}`;
  }
  
  if (command === `SELECT`)
 {
   db.all(statement, (err, rows) =>
     {
       if (err)
       {
         console.log(err);
       }
       else
       {
         callback(rows);
       }
     }
   )
 }
 else if (command === `WHERE`)
 {
   //  console.log(`STATEMENT NYA ADALAH ${statement}`);
   db.each(statement, (err, row) =>
     {
       if (err)
       {
         console.log(err);
       }
       else
       {
         callback(row);
       }
     }
   )
 }
 resetAll();
}

let update = (Obj) =>
{
  for (let i = 0; i < properties.length - 1 ; i++)
  {
    fill += `${properties[i]} = "${Obj[properties[i]]}", `
  }
  
  fill += `${properties[properties.length - 1]} = "${Obj[properties[properties.length - 1]]}" WHERE ID = ${Obj.ID}`
  
  command = `UPDATE`;
  statement = `UPDATE ${tableName} SET ${fill}`;
  console.log(statement);
  db.run(statement);
  resetAll();
}


let deleteQuery = (id) =>
{
  statement = `DELETE FROM ${tableName} WHERE ID = ${id}`;
  db.run(statement);
  resetAll();
}


let resetAll = () =>
{
  statement = ``;
  command = ``;
  fill = ``;
  columnNames = ``;
}

module.exports = {add, select, update, deleteQuery};