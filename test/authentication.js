var assert = require('assert');
var bluebird = require('bluebird');
var chai = require('chai');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var supertest = require('supertest');

/**
 * BLUEBIRD SETUP
 */
Promise = bluebird.Promise;
mongoose.Promise = Promise;

/**
 * CHAI SETUP
 */
var expect = chai.expect;
chai.should();

/**
 * SUPERTEST SETUP
 */
var server = supertest.agent(require('../app'));

/**
 * DATABASE MODEL DEFINITIONS
 */
var user_information_model = mongoose.model('user_information');
var user_authentication_model = mongoose.model('user_authentication');
var test_user_information_model = new user_information_model({
  _id: mongoose.Types.ObjectId(),
  first_name: 'John',
  last_name: 'Snow',
  email: 'example@example.com',
  permissions: {
    'events': ['*'],
    'jwt': ['*']
  }
});
var test_user_authentication_model = new user_authentication_model({
  username: 'johnsnow',
  password: 'testpassword',
  user: test_user_information_model._id
});

/**
 * UNIT TEST
 */
describe('Authentication', function () {
  
  /**
   * BEFORE THESE TESTS INSERT TEST DATA
   */
  before('authentication test', function (done) {
    Promise.all([
      user_information_model.remove({}),
      user_authentication_model.remove({})
    ])
    .then(function () {
      return Promise.all([
        test_user_information_model.save(),
        test_user_authentication_model.save()
      ]);
    })
    .then(function () {
      done();
    });
  });

  /**
   * CLEAR TEST DATA AFTER THESE TESTS
   */
  after('authentication test', function (done) {
    Promise.all([
      user_information_model.remove({}),
      user_authentication_model.remove({})
    ]).then(function () {
      done();
    });
  });

  /**
   * TEST SUCCESFUL AUTHENTICATION
   */
  describe('Succesful user authentication', function () {
    it('should send 200 OK', function(done){
      server
        .post('/api/authentication/user')
        .type('form')
        .send({
          username: test_user_authentication_model.username,
          password: test_user_authentication_model.password
        })
        .end(function (err, res) {
          res.status.should.be.equal(200);
          done();
        });
    });
    it('should return a token as string', function (done) {
      server
        .post('/api/authentication/user')
        .type('form')
        .send({
          username: test_user_authentication_model.username,
          password: test_user_authentication_model.password
        })
        .end(function (err, res) {
          res.body.should.be.a('object');
          res.body.token.should.be.a('string');
          done();
        });
    });
  });

  /**
   * TEST UNSUCCESFUL AUTHENTICATION
   */
  describe('Unsuccesful user authentication', function() {
    it('should send 403 FORBIDDEN', function(done){
      server
        .post('/api/authentication/user')
        .type('form')
        .send({
          username: test_user_authentication_model.username,
          password: 'wrong password'
        })
        .end(function (err, res) {
          res.status.should.be.equal(403);
          done();
        });
    });
    it('should contain error message in body', function(done) {
      server
        .post('/api/authentication/user')
        .type('form')
        .send({
          username: test_user_authentication_model.username,
          password: 'wrong password'
        })
        .end(function (err, res) {
          res.body.error.should.be.a('string');
          done();
        });
    });
  })
});
/**
 * END OF UNIT TEST
 */