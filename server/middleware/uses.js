const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express");
const {verify} = require('../controller/auth.controller');

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(express.static("public"));
    

    const authRoute = require('../routes/auth.routes')
    app.use('/auth', authRoute)
}