const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');

const StartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started at Port: ${PORT}`);
    })
    
}

StartServer();