const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRouter = require("./router/userRouter");
const fileRouter = require("./router/fileRouter");
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //post put
app.use('/api/user/', userRouter);
app.use('/api/files/', fileRouter);

app.listen(port, host, function () {
    console.log(`Server listens`,
        `http://${host}:${port}/api/user/`,
    );
})