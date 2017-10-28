const sqlite3   = require('sqlite3');
const db        = new sqlite3.Database('./database/database.db');
const tableName = `Contacts`;

let statement = ``;
let command = ``;

/*
  function add
  parameter : contact object
  creating statement to be passed on to execute function
*/

let add = (contactObj) =>
{
  command = `INSERT`;
  statement = `INSERT INTO ${tableName} VALUES (
        "${contactObj.name}", "${contactObj.company}", "${contactObj.telp_number}", "${contactObj.email}")`;
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

let update = (contactObj) =>
{
  command = `UPDATE`;
  statement = `UPDATE ${tableName} SET name = "${contactObj.name}", company = "${contactObj.company}", telp_number = "${contactObj.telp_number}", email = "${contactObj.email}" WHERE ID = ${contactObj.ID}`;
  console.log(`masuk update, statement nya ${a}`);
  db.run(a);
}


let deleteQuery = (id) =>
{
  statement = `DELETE FROM ${tableName} WHERE ID = ${id}`;
  db.run(statement)
}


// class Contacts
// {
//   constructor()
//   {
//     this.tableName = `Contacts`;
//     this.command = ``;
//     this.statement = ``;
//   }
//
//   add(contactObj)
//   {
//     this.command = `INSERT`;
//     this.statement = `INSERT INTO ${this.tableName} VALUES (
//       "${contactObj.name}", "${contactObj.company}", "${contactObj.telp_number}", "${contactObj.email}")`;
//     this.execute();
//   }
//
//   select(callback, column = `*`)
//   {
//     let statement = `SELECT ${column} FROM ${this.tableName}`
//     // this.statement = ;
//     this.execute(statement, callback);
//   }
//
//   execute(statement, callback)
//   {
//     db.all(statement, (err, rows) =>
//       {
//         if (err)
//         {
//           console.log(err);
//         }
//         callback(rows);
//       }
//     );
//     // db.run(this.statement);
//   }
// }



module.exports = {add, select, update, deleteQuery};