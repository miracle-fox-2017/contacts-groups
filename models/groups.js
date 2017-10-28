class Groups {

    constructor() {
        
    }

    panggilData() {
        let getData = "SELECT * FROM groups";
        return getData;
    }

    editData(id) {
        let getData = `SELECT * FROM groups WHERE id = ${id}`;
        return getData;
    }

    simpanData(obj) {
        let getData = `INSERT INTO groups (name_of_group) values('${obj.nama}')`;
        return getData;
    }

    updateData(obj) {
        let getData = `UPDATE groups set name_of_group = '${obj.nama}' WHERE id = ${obj.id}`;
        return getData;
    }

    hapusData(id) {
        let getData = `DELETE FROM groups WHERE id = ${id}`;
        return getData;
    }

}

module.exports = Groups;