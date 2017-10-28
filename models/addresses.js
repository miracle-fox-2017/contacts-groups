class Addresses {

    constructor() {
        
    }

    panggilData() {
        let getData = "SELECT * FROM address";
        return getData;
    }

    editData(id) {
        let getData = `SELECT * FROM address WHERE id = ${id}`;
        return getData;
    }

    simpanData(obj) {
        let getData = `INSERT INTO address (street,city,zipcode)
                    values('${obj.street}','${obj.city}','${obj.zipcode}')`;
        return getData;
    }

    updateData(obj) {
        let getData = `UPDATE address set street = '${obj.street}',
                                        city = '${obj.city}',
                                        zipcode = '${obj.zipcode}'
                                    WHERE id = ${obj.id}`;
        return getData;
    }

    hapusData(id) {
        let getData = `DELETE FROM address WHERE id = ${id}`;
        return getData;
    }

}

module.exports = Addresses;