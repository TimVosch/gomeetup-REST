var helper = require('./helper');
var bluebird = require('bluebird');
var server = helper.server;

describe('Authentication endpoints', function() {
  describe('Authenticating a user', function () {
    beforeEach(helper.populate_database);
    describe('Successful', function () {
      it('should send 200 OK', function(done) {
        server
          .get('/api/authentication/user')
          .auth(helper.dummy.username, helper.dummy.password)
          .send()
          .end(function(err, res) {
            res.status.should.be.equal(200);
            done();
          });
      });
      it('should return a token', function(done) {
        server
          .get('/api/authentication/user')
          .auth(helper.dummy.username, helper.dummy.password)
          .send()
          .end(function(err, res) {
            expect(res.body.token).to.exist;
            res.body.token.should.be.a('string');
            done();
          });
      });
    });
    describe('Reversed credentials (should not authorize)', function () {
      it('should send 401 UNAUTHORIZED', function(done) {
        server
          .get('/api/authentication/user')
          .auth(helper.dummy.password, helper.dummy.username)
          .send()
          .end(function(err, res) {
            res.status.should.be.equal(401);
            done();
          });
      });
      it('should return an error message', function(done) {
        server
          .get('/api/authentication/user')
          .auth(helper.dummy.password, helper.dummy.username)
          .send()
          .end(function(err, res) {
            expect(res.body.error).to.exist;
            res.body.error.should.be.a('string');
            done();
          });
      });
    });
    describe('Wrong credentials (should not authorize)', function () {
      it('should send 401 UNAUTHORIZED', function(done) {
        server
          .get('/api/authentication/user')
          .auth('wrong username', 'wrong password')
          .send()
          .end(function(err, res) {
            res.status.should.be.equal(401);
            done();
          });
      });
      it('should return an error message', function(done) {
        server
          .get('/api/authentication/user')
          .auth('wrong username', 'wrong password')
          .send()
          .end(function(err, res) {
            expect(res.body.error).to.exist;
            res.body.error.should.be.a('string');
            done();
          });
      });
    });
  });
  describe('Creating a user', function () {
    describe('Successful', function () {
      
    });
    describe('Unsuccessful', function () {
      beforeEach(helper.populate_database);
      
    });
  });
});