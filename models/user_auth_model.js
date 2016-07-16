var mongoose = require('mongoose');
var user_authentication_schema = require('../schemas/user_authentication_schema');

module.exports = mongoose.model('UserAuth', user_authentication_schema);