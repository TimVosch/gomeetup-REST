/**
 * SET ENV VARIABLES
 */
//
process.env.NODE_ENV = 'testing';
process.env.DEBUG = 'gomeetup:internal_errors';
process.env.APP_TOKEN_SECRET = 'DEBUG';

var mongoose = require('mongoose');
var supertest = require('supertest');
var bluebird = require('bluebird');
var jwt = require('jsonwebtoken');
var uuid = require('uuid');
var app = require('../app');
var server = supertest.agent(app);
var clearDB = require('mocha-mongoose')(process.env.DB_TEST);
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
  _id: mongoose.Types.ObjectId(),
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
    _id: helper.dummy._id,
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
 * Dummy current location
 */
helper.dummy_location = [-39.74269, 52.48999];

/**
 * Dummy event_metas data 
 */
helper.dummy_events = [
  {
    type: 'meetup',
    name: '1 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.72827, 52.49004]
  },
  {
    type: 'meetup',
    name: '1.5 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.72132, 52.48994]
  },
  {
    type: 'meetup',
    name: '2.5 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.70622, 52.48978]
  },
  {
    type: 'meetup',
    name: '3 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.69883, 52.48983]
  },
  {
    type: 'meetup',
    name: '3.5 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.6918, 52.48983]
  },
  {
    type: 'meetup',
    name: '5 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.66905, 52.48994]
  },
  {
    type: 'meetup',
    name: '6 km',
    creator: 'test creator',
    description: 'description',
    location: [-39.65506, 52.48999]
  }
];

/**
 * Populates the database with dummy event data
 */
helper.populate_database_with_dummy_events = (done) => {
  var promises = [];
  for (var key in helper.dummy_events) {
    if (helper.dummy_events.hasOwnProperty(key)) {
      var element = helper.dummy_events[key];
      promises.push(
        (new (mongoose.model('event_meta'))(element)).save()
        );
    }
  }
  Promise.all(promises)
    .then(() => {
      done();
    });
}

/**
 * The secret for signing jwts
 */
helper.token_secret = process.env.APP_TOKEN_SECRET;

/**
 * Returns a valid JWT that is valid for 5 seconds
 */
helper.get_token = (permissions) => {// Create JWT payload
  var payload = {
    uuid: uuid.v4(),
    user_id: helper.dummy._id,
    permissions
  };
  return jwt.sign(payload, helper.token_secret, {
      expiresIn: '5s'
    });
}

/**
 * Supertest client
 */
helper.server = server;

module.exports = helper;