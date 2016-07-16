var mongoose = require('mongoose');
var user_auth_schema = require('../schemas/user_auth_schema');

module.exports = mongoose.model('UserAuth', user_auth_schema);