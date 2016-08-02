var helper = require('./helper');
var bluebird = require('bluebird');
var server = helper.server;

describe('Authentication endpoints', function() {
  describe('Authenticating a user (GET /api/authentication/user)', function () {
    beforeEach(helper.populate_database);
    describe('Successful', function () {
      it('should return status 200 OK', function(done) {
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
      it('should return status 401 UNAUTHORIZED', function(done) {
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
      it('should return status 401 UNAUTHORIZED', function(done) {
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
  describe('Creating a user (POST /api/authentication/user)', function () {
    describe('Successful', function () {
      it('should return 200 OK', function(done) {
        server
          .post('/api/authentication/user')
          .type('form')
          .send({
            username: helper.dummy.username,
            password: helper.dummy.password,
            first_name: helper.dummy.first_name,
            last_name: helper.dummy.last_name,
            email: helper.dummy.email
          })
          .end(function(err, res) {
            res.status.should.be.equal(200);
            done();
          });
      });
      it('should return a success message', function(done) {
        server
          .post('/api/authentication/user')
          .type('form')
          .send({
            username: helper.dummy.username,
            password: helper.dummy.password,
            first_name: helper.dummy.first_name,
            last_name: helper.dummy.last_name,
            email: helper.dummy.email
          })
          .end(function(err, res) {
            res.body.message.should.exist;
            res.body.message.should.be.a('string');
            done();
          });
      });
    });
    describe('Unsuccessful', function () {
      beforeEach(helper.populate_database);
      it('should return 409 CONFLICT', function(done) {
        server
          .post('/api/authentication/user')
          .type('form')
          .send({
            username: helper.dummy.username,
            password: helper.dummy.password,
            first_name: helper.dummy.first_name,
            last_name: helper.dummy.last_name,
            email: helper.dummy.email
          })
          .end(function(err, res) {
            res.status.should.be.equal(409);
            done();
          });
      });
      it('should return an error message', function(done) {
        server
          .post('/api/authentication/user')
          .type('form')
          .send({
            username: helper.dummy.username,
            password: helper.dummy.password,
            first_name: helper.dummy.first_name,
            last_name: helper.dummy.last_name,
            email: helper.dummy.email
          })
          .end(function(err, res) {
            res.body.error.should.exist;
            res.body.error.should.be.a('string');
            done();
          });
      });
    });
  });
});