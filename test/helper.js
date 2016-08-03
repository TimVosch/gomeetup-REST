/**
 * SET ENV VARIABLES
 */
//
process.env.NODE_ENV = 'testing';
process.env.DEBUG = 'gomeetup:internal_errors';

var mongoose = require('mongoose');
var supertest = require('supertest');
var bluebird = require('bluebird');
var app = require('../app');
var server = supertest.agent(app);
var clearDB = require('mocha-mongoose')('mongodb://localhost/gomeetup_test');
var chai = require('chai');
Promise = bluebird.Promise;
chai.should();
expect = chai.expect;


/**
 * Pre-logic defined here
 */

// After all tests have run, close the mongoose connection
// Because our app.js will try to open it again.
after(function(done) {
  mongoose.connection.close();
  done();
});

// Clear database
clearDB(function(err) {
  if (err)
    throw err;
});

/**
 * Export functions and variables defined after this line
 */
var helper = {};

/**
 * Dummy data
 */
helper.dummy = {
  username: 'johnsnow',
  password: 'testpassword',
  first_name: "John",
  last_name: "Snow",
  email: "example@example.com",
  permissions: {
    event: ['read']
  }
};


/**
 * Populates the database with some dummy data
 */
helper.populate_database = (done) => {
  var user_information = new (mongoose.model('user_information'))({
    _id: mongoose.Types.ObjectId(),
    first_name: helper.dummy.first_name,
    last_name: helper.dummy.last_name,
    email: helper.dummy.email,
    permissions: helper.dummy.permissions
  });
  var user_authentication = new (mongoose.model('user_authentication'))({
    username: helper.dummy.username,
    password: helper.dummy.password,
    user: user_information._id
  });
  Promise.all([
    user_information.save(),
    user_authentication.save()
  ])
  .then(function() {
    if (!!done)
      done();
  })
  .catch(err => {
    console.error('====# Error occured while populating DB #====');
    console.error(err);
    throw err;
  });
}

/**
 * Supertest client
 */
helper.server = server;

module.exports = helper;