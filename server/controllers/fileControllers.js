// const client = require("../DataBase/dbConnect");
const dbControllers = require("../DataBase/dbControllers");
const fs = require('fs');
const path = require('path');

// path.join()
// let userInfo = require('../src/js/login');

class FileControllers {
    async postFile (req, res) {
        let {userId, titel, text} = req.body;
        console.log("user_id", userId);
        console.log("name", titel);
        console.log("text", text);
        // let sql = `INSERT INTO files (user_id, name, path) VALUES ('${userId}', '${titel}','../src/files/${userId}/')`;
        let data = await dbControllers.postFile(userId, titel)
            // .then(data => console.log(data))
        // console.log(req.body);
        // console.log(path.isAbsolute(`../server/src/files/${userId}`));
        console.log(fs.existsSync(`../server/src/files/${userId}`));

        try {
            if(fs.existsSync(`../server/src/files/${userId}`)){
                console.log(1);
                fs.writeFile(`../server/src/files/${userId}/${titel}.txt`,`${text}`,'utf8',(err) => {
                          
                    console.log('Done');
                         
                });
        
                res.send(JSON.stringify(data));
                
            } else {
                console.log('2 else');
                fs.mkdir(`../server/src/files/${userId}`, err => {
                    // if(err) throw err; // не удалось создать папку
                    console.log(err);
                    console.log('Папка успешно создана');
                    console.log(2);
                });
                fs.writeFile(`../server/src/files/${userId}/${titel}.txt`,`${text}`,'utf8',(err) => {
                    console.log(err);
                    console.log('Done');
                   
                });
                res.send(JSON.stringify(data));
            }

        } catch (error) {
            // res.send(error);
            console.log(error);
        }
    }
    async getAllFiles(req, res) {
        let {userId} = req.body;
        let data = await dbControllers.getAllFiles(userId);
        console.log(data);
        try {
            res.send(JSON.stringify(data))
        } catch(err) {
            console.log(err);
        }
    }

    async getText (req, res) {
        let {path} = req.body;
        path = path.split('');
        path.shift()
        path.shift()
        path = path.join('');
        try {
            const result = fs.readFileSync('../server'+path+'.txt', { encoding: "utf-8" });
          
            console.log(result);
            res.send(JSON.stringify(result))
            return JSON.stringify(result);
        } catch (err) {
            console.error(err);
        }
    }

    async updateFile(req, res) {
        let {userId, name, text} = req.body;
        fs.writeFile(`../server/src/files/${userId}/${name}.txt`,`${text}`,'utf8',(err) => {
            console.log(err);
            console.log('Done');
           
        });
        // res.send(JSON.stringify(data));
    }

}

module.exports = new FileControllers