const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');
const StartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server started at Port: ${PORT}`);
    })
    
}

StartServer();