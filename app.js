var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// Route index
var routerIndex = require('./routes/index');

mongoose.Promise = require('bluebird');

// Connect to database
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;

// Start server on succesfull connection
db.once('open', function () {
  console.log('succesfull connection!');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(routerIndex);
});

// Report error on failure
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;