const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Contact = require('./modelContact')

class Address {

    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `select * from addresses`
            db.all(query, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static findContactAddress(idContact) {
        return new Promise((resolve, reject) => {
            Contact.findById(idContact).then((contact) => {
                contact.address = []
                Address.findAll().then((addresses) => {
                    addresses.forEach((address, index) => {
                        if (address.idContact == contact.id) {
                            contact.address.push({
                                street: address.street,
                                city: address.city,
                                zipcode: address.zipcode
                            })

                            resolve(contact)

                        }
                    })
                })

            }).catch((reason) => {
                reject(reason)
            })
        })
    }
    static getDataContact() {
        return new Promise((resolve, reject) => {
            Address.findAll().then((addresses) => {
                let hasil = []
                addresses.forEach(function (address, index) {
                    if (!address.idContact) {
                        hasil.push(address)
                    } else {
                        Contact.findById(address.idContact).then((contact) => {
                            address.name = contact.name
                            hasil.push(address)
                            if (hasil.length == addresses.length - 1) {
                                resolve(hasil)
                            }
                        })
                    }
                })

            }).catch((reason) => {
                reject(reason)
            })
        })
    }

    static create(newData) {
        // console.log(newData)
        return new Promise((resolve, reject) => {
            let query = `insert into addresses (street, city, zipcode, idContact) values('${newData.street}', '${newData.city}', ${newData.zipcode}, ${newData.idContact})`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            let query = `select * from addresses where id = ${id}`
            db.each(query, function (err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    }
    static updateData(id, newData) {
        return new Promise((resolve, reject) => {
            let query = `update addresses set street = '${newData.street}', city = '${newData.city}', zipcode = ${newData.zipcode}, idContact = ${newData.idContact} where id = ${id}`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
    static removeData(id) {
        return new Promise((resolve, reject) => {
            let query = `delete from addresses where id = ${id}`
            db.run(query, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

}

module.exports = Address
