const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

class Address {

    static getData(callback) {
        let query = 'select * from addresses'
        db.all(query, function (err, rows) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, rows)
            }
        })
    }
    static addData(newData) {
        let query = `insert into addresses (street, city, zipcode, idContact) values ('${newData.street}', '${newData.city}', '${newData.zipcode}', ${newData.idContact})`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    static getDataById(callback, id) {
        let query = `select * from addresses where id = ${id}`
        db.each(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }
    static updateData(id, newData) {
        // console.log(id, newData)
        let query = `update addresses set street = '${newData.street}', city = '${newData.city}', zipcode = ${newData.zipcode}, idContact = ${newData.idContact} where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
    static deleteData(id) {
        let query = `delete from addresses where id = ${id}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    static getDataAddressContact(callback, idContact) {
        let query = `select * from addresses where idContact = ${idContact}`
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })

    }

}

module.exports = Address
