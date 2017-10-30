const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Group = require('./modelGroup')
const Contact = require('./modelContact')

class ContactGroup {

    static getData(callback) {
        let query = 'select * from  groups'
        db.all(query, function (err, rows) {
            if (err) {
                callback(err)
            } else {
                callback(rows)
            }
        })
    }
    static addData(idGroup, idContact) {
        let query = `insert into contactgroups (idContact, idGroup) values (${idContact}, ${idGroup})`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    static getContactGroup(dataContact, callback) {
        let result = []
        dataContact.forEach((contact) => {
            contact.group = []
            let query = `select * from contactgroups inner join groups on contactgroups.idGroup = groups.id where contactgroups.idContact = ${contact.id}`
            db.all(query, function (err, rows) {
                rows.forEach((row) => {
                    contact.group.push(row.name_of_group)

                })
                result.push(contact)
                // console.log(result)
                if (result.length == dataContact.length) {
                    callback(result)
                }
            })
        });
    }
    static getGroupContact(dataGroup, callback) {
        let result = []
        dataGroup.forEach((group) => {
            group.contact = []
            let query = `select * from contactgroups inner join contacts on contactgroups.idContact = contacts.id where contactgroups.idGroup = ${group.id}`
            db.all(query, function (err, rows) {
                rows.forEach((row) => {
                    group.contact.push(row.name)
                })
                result.push(group)
                if (result.length == dataGroup.length) {
                    callback(result)
                }
            })
        })
    }

    static removeDataByIdContact(idContact, callback) {
        let query = `delete from contactgroups where idContact = ${idContact}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            } else {
                callback()
            }
        })
    }

    static removeDataByIdGroup(idGroup, callback) {
        let query = `delete from contactgroups where idGroup = ${idGroup}`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            } else {
                callback()
            }
        })
    }
}

module.exports = ContactGroup