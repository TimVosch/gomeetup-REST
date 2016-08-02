var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var debug = require('debug')('gomeetup:app');
var app = express();
Promise = require('bluebird');

/**
 * Use bluebird for mongoose promises
 */
mongoose.Promise = Promise;

/**
 * Set testing mode
 */
if (process.env.NODE_ENV == 'testing') {
  app.set('testing', true);
  debug('====# Testing mode! #====');
}

/**
 * Get JWT settings from environment and store in Express.
 */

app.set('jwt_secret', process.env.APP_TOKEN_SECRET || 'DEBUG');
app.set('jwt_expiration', process.env.APP_TOKEN_TIMEOUT || 60*60*24);

/**
 * Default permissions for a new user.
 * These could also be set when a user confirms their account through email(?)
 */

app.set('default_permissions', {
  events: [
    'read'
  ]
});

/**
 * Connect to MongoDB server
 */
if (app.get('testing') == true){
  mongoose.connect("mongodb://localhost/gomeetup_test");
} else {
  mongoose.connect("mongodb://localhost/test");
}
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