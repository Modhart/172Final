var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var mongoose = require('mongoose');  
var morgan = require('morgan');
var bodyParser = require('body-parser');

// connect to mongoDB database 
mongoose.connect(config.db.url);

//Set - up global middleware
 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

app.use('/api/', api);

// Error Handler Global Middleware
app.use(function(err,req,res,next){
        console.error(err.stack);
        res.status(500).send("Some Errors Happened!")});
 
// export the app for testing
module.exports = app;