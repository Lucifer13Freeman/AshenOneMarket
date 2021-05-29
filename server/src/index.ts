export {};
require('dotenv').config();
const express = require('express');
const Sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const file_upload = require('express-fileupload');
const router = require('./routes/index');
const ErrorHandler = require('./middleware/error_handling_middleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'static')))
app.use(file_upload({}));
app.use('/api', router);

app.use(ErrorHandler);

const start = async () => {

    try
    {
        await Sequelize.authenticate();
        await Sequelize.sync();

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    }
    catch (e)
    {
        console.log(e);
    }
}

start();