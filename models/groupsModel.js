const sqlite3   = require('sqlite3');
const db        = new sqlite3.Database('./database/database.db');
const tableName = `Groups`;

let statement = ``;
let command = ``;

/*
  function add
  parameter : contact object
  creating statement to be passed on to execute function
*/

let add = (groupObj) =>
{
  command = `INSERT`;
  statement = `INSERT INTO ${tableName} VALUES (
        "${groupObj.ID}", "${groupObj.name_of_group}")`;
  db.run(statement)
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
}

let update = (groupObj) =>
{
  command = `UPDATE`;
  statement = `UPDATE ${tableName} SET name_of_group = "${groupObj.name_of_group}" WHERE ID = ${groupObj.ID}`;
  // console.log(`masuk update, statement nya ${statement}`);
  db.run(a);
}


let deleteQuery = (id) =>
{
  statement = `DELETE FROM ${tableName} WHERE ID = ${id}`;
  db.run(statement)
}

module.exports = {add, select, update, deleteQuery};