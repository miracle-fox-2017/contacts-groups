const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.db')


function createContact() {
    let query = 'CREATE table if not exists contacts (' +
        'id integer primary key autoincrement,' +
        'name text, ' +
        'company text,' +
        'telp_number varchar(13),' +
        'email varchar(100)' +
        ')'

    db.run(query, ((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Table contacts successfully created!")
        }
    }))
}

function createGroup() {
    let query = 'create table if not exists groups (' +
        'id integer primary key autoincrement,' +
        'name_of_group varchar(50)' +
        ')'

    db.run(query, ((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Table groups successfully created!")
        }
    }))
}

function createProfile() {
    let query = 'create table if not exists profiles (' +
        'id integer primary key autoincrement,' +
        'username varchar(50),' +
        'password varchar(100)' +
        ')'

    db.run(query, ((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Table profiles successfully created!")
        }
    }))

}
function createAddress() {
    let query = 'create table if not exists addresses (' +
        'id integer primary key autoincrement,' +
        'street text,' +
        'city text,' +
        'zipcode integer' +
        ')'
    db.run(query, ((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Table addresses successfully created!")
        }
    }))
}

createContact()
createGroup()
createProfile()
createAddress()
