/**
 * This connects the seperated api modules.
 */
module.exports = {
  authentication: require('./authentication'),
  events: require('./events')
};