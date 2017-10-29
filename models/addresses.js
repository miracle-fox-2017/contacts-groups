class Addresses {

    constructor() {
        
    }

    panggilData() {
        let getData = "SELECT address.*,contact.name FROM address INNER JOIN contact ON contact.id = address.idcontact";
        return getData;
    }

    panggil() {
        let getData = "SELECT * FROM address";
        return getData;
    }

    panggilDataContact() {
        let getData = "SELECT * FROM contact";
        return getData;
    }

    dataContact(id) {
        let getData = `SELECT * FROM contact WHERE id = ${id}`;
        return getData;
    }

    editData(id) {
        let getData = `SELECT * FROM address WHERE id = ${id}`;
        return getData;
    }

    simpanData(obj) {
        let getData = `INSERT INTO address (street,city,zipcode,idcontact)
                    values('${obj.street}','${obj.city}','${obj.zipcode}',${obj.idcontact})`;
        return getData;
    }

    updateData(obj) {
        let getData = `UPDATE address set street = '${obj.street}',
                                        city = '${obj.city}',
                                        zipcode = '${obj.zipcode}',
                                        idcontact = '${obj.idcontact}'
                                    WHERE id = ${obj.id}`;
        return getData;
    }

    hapusData(id) {
        let getData = `DELETE FROM address WHERE id = ${id}`;
        return getData;
    }

}

module.exports = Addresses;