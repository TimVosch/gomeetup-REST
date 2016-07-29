var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
Promise = require('bluebird');

/**
 * Use bluebird for mongoose promises
 */
mongoose.Promise = Promise;

/**
 * Connect to MongoDB server
 */
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;

require('./models/load_models').load();

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

  /**
   * The base router.
   * Other routes extend from there
   */
  // Load the base router
  app.use('/api', require('./routes/index_route'));
});

/**
 * Report errors
 */
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;