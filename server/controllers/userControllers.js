const client = require("../DataBase/dbConnect");
const dbControllers = require("../DataBase/dbControllers");
// const path = require('path')ж

class UserController {
    // redirectToLogin(req, res) {
    //     const options = {
    //         root: path.join('../../')
    //     } 
    //     res.sendFile('login.html', options , (err) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('Sent:', fileName);
    //         }
    //     });
    // }
    async registration(req, res) {
        let {password, login, email} = req.body;
        let str = `INSERT INTO users (login, password, email, created_on)
        VALUES ('${login}', '${password}', '${email}', '2004-10-19 00:00:00 +0000') RETURNING *`;
        let data = await dbControllers.insert(str);
        console.log(data);
        res.send(JSON.stringify(data));
    }

    async login(req, res) {
        let {password, login} = req.body;
        console.log("login",login);
        console.log("pass",password);

        let data = await dbControllers.selectAll(
            "users",
            ['user_id','created_on'],
            {password, login}
        );
        res.send(JSON.stringify(data));
    }

    async getinfo(req, res) {
        // let {password, login} = req.body;
        let log = req.body;
        // const user = await client.query(`SELECT * FROM users WHERE login = '${login} and password = '${password}'`[id]);
        const user = await client.query(`SELECT * FROM users WHERE login = $1`,[log]);
        res.json(user.rows[0]);
    }
}

module.exports = new UserController;

