const client = require('./dbConnect');

class DBController {
    async insert(sql) {
        try {
            let data = await client.query(sql);
            return data.rows[0];
        } catch (error) {
            console.log(error);
        }
    }

    async selectAll(DBName, select = [], objWhere = {}) {
        let where = "";
        for (const key in objWhere) {
            where += ` ${key} = '${objWhere[key]}' and `;
        }
        where += "true";
        const str = `SELECT ${select.join(", ")} FROM  ${DBName} where ${where}`;
        try {
            let data = await client.query(str);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async postFile (userId, titel) {
        let sql = `INSERT INTO files (user_id, name, path) VALUES ('${userId}', '${titel}.txt','../src/files/${userId}/${titel}')`;
        try {
            let data = await client.query(sql);
            return data
        } catch (err) {
            console.log(err);
        }

    }

    async getAllFiles(user_id) {
        const sql = `SELECT * FROM files WHERE user_id='${user_id}'`;
        try {
            let data = await client.query(sql);
            console.log(data.rows);
            return data.rows
        } catch (err) {
            return err;
        }
    }
}

module.exports = new DBController;
