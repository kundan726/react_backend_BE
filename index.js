const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { dbConnection } = require('./db/dbConnection')
const mongodbURL = process.env.MONGODB_URL;
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
dbConnection(mongodbURL);
const routes = require('./routes');
app.use('/api',routes);
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
console.log("Running in:", process.env.NODE_ENV);
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})

