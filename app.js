var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

/**
 * The base router.
 * Other routes extend from there
 */
var routerIndex = require('./routes/index');

/**
 * Use bluebird for mongoose promises
 */
mongoose.Promise = require('bluebird');

/**
 * Connect to MongoDB server
 */
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;

/**
 * Start the server when MongoDB connection is succesfull
 */
db.once('open', function () {
  console.log('succesfull connection!');

  // parse json body as well as url parameters
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Load the base router
  app.use('/api', routerIndex);
});

/**
 * Report errors
 */
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;