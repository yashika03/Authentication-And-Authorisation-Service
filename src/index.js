const bodyParser = require('body-parser');
const express = require('express');


const app = express();
const {PORT} = require('./config/serverConfig');
const db = require('./models/index');

const {User, Role} = require('./models/index');

const apiRoutes = require('./routes/index');
const StartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    app.listen(PORT, async () => {
        console.log(`Server started at Port: ${PORT}`);

        if(process.env.DB_SYNC=="true")
        {
            db.sequelize.sync({alter: true});
        }

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(2);
        // const response = await u1.hasRole(r1);
        // console.log(response);

    });

}
StartServer();