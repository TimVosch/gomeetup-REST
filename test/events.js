var helper = require('./helper');
var bluebird = require('bluebird');
var server = helper.server;

describe('Events endpoints', function() {
  beforeEach(helper.populate_database_with_dummy_events);
  describe('Get nearby events', function() {
    describe('Successful', function(){
      it('Should return status 200 OK', function(done) {
        var token = helper.get_token({
          events: ['nearby']
        });
        server
          .get('/api/events/nearby/' + helper.dummy_location[0] + '/' + helper.dummy_location[1] + '/3000')
          .set('x-access-token', token)
          .send()
          .end( function(err, res) {
            res.status.should.equal(200);
            done();
          });
      });
      it('Should find three nearby events within 3000 meters', function(done) {
        var token = helper.get_token({
          events: ['nearby']
        });
        server
          .get('/api/events/nearby/' + helper.dummy_location[0] + '/' + helper.dummy_location[1] + '/3000')
          .set('x-access-token', token)
          .send()
          .end( function(err, res) {
            expect(res.body).to.have.key('events');
            res.body.events.length.should.equal(4);
            done();
          });
      });
    });
    describe('Unsuccessful (invalid longitude)', function() {
      it('Should return 400 BAD REQUEST with error message', function(done) {
        var token = helper.get_token({
          events: ['nearby']
        });
        server
          // Notice the random letter 'a' in longitude component
          .get('/api/events/nearby/' + helper.dummy_location[0] + 'a' + '/' + helper.dummy_location[1] + '/3000')
          .set('x-access-token', token)
          .send()
          .end( function(err, res) {
            res.status.should.equal(400);
            res.body.should.have.key('error');
            res.body.error.should.be.a('string');
            done();
          });
      });
    });
  });
});