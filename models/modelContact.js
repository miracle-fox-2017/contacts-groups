const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')


class Contact {
    static getData(callback) {
        let query = 'select * from contacts'
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }
    static addData(newData) {
        //console.log(newData)
        let query = `insert into contacts (name, company, telp_number, email) values ('${newData.name}', '${newData.company}', '${newData.telp_number}', '${newData.email}')`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    static getDataById(callback, id) {
        let query = `select * from contacts where id = ${id}`
        db.each(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }

    static updateData(id, newData) {
        let query = `update contacts set name = '${newData.name}', company = '${newData.company}', telp_number = '${newData.telp_number}', email= '${newData.email}' where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    static deleteData(id) {
        let query = `delete from contacts where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports = Contact