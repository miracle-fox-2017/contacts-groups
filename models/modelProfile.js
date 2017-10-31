const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Contact = require('./modelContact')

class Profile {

    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `select * from profiles`
            db.all(query, function (err, rowsprofile) {
                if (err) {
                    reject(err)

                } else {
                    resolve(rowsprofile)
                }
            })
        })
    }

    static getDataContact() {
        return new Promise((resolve, reject) => {
            Profile.findAll().then((profiles) => {
                let hasil = []
                profiles.forEach(function (profile, index) {
                    if (!profile.idContact) {
                        hasil.push(profile)
                    } else {
                        Contact.findById(profile.idContact).then((contact) => {
                            profile.name = contact.name
                            hasil.push(profile)
                            if (hasil.length == profiles.length - 1) {
                                resolve(hasil)
                            }
                        })
                    }
                })

            })
        })
    }

    static create(newData) {
        return new Promise((resolve, reject) => {
            let query = `insert into profiles(username, password, idContact) values('${newData.username}', '${newData.password}', ${newData.idContact})`
            db.run(query, function (err) {
                if (err) {
                    reject('Your contact already has profile ')
                } else {
                    resolve()
                }
            })
        })
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            let query = `select * from profiles where id = ${id}`
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
            let query = `update profiles set username = '${newData.username}', password = '${newData.password}', idContact = ${newData.idContact} where id = ${id}`
            db.run(query, function (err) {
                if (err) {
                    reject('Your contact already has profile')
                } else {
                    resolve()
                }
            })
        })
    }
    static removeData(id) {
        return new Promise((resolve, reject) => {
            let query = `delete from profiles where id = ${id}`
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

module.exports = Profile