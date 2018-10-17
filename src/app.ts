//Web
import express = require('express');
//import jwt = require('express-jwt');
import expressValidator = require('express-validator');
import bodyParser = require('body-parser');
//Db
// import mongoose = require('mongoose');
// import { DataBase } from './helpers/db';
//Else
import async = require('async');
import schedule = require('node-schedule');
import { Auth } from "./middlewares/auth";
const config = require("./config");

let app = express();
// DataBase.connect(config);
app.use(bodyParser.urlencoded({ extended: true })) //Set as in previous back
app.use(bodyParser.json())

//Cors allow
app.all('*', function(req, res: any, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, UPDATE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if ('OPTIONS' == req.method) return res.sendStatus(200);
    next();
});

declare global {
    namespace ExpressValidator {
        export interface Validator {
            isObjectId: () => boolean;
        }
    }
}
app.use(expressValidator({
    customValidators: {
        isObjectId: (value) => {
            return true;
            // return mongoose.Types.ObjectId.isValid(value);
        }
    }
}))

app.use(require('./controllers'))

//Run
app.listen(config.app_port, function() {
    console.log('Listening on port ' + config.app_port)
})

export = app;