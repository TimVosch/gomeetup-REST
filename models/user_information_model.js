var mongoose = require('mongoose');
var user_permissions_schema = require('../schemas/user_permissions_schema');

module.exports = mongoose.model('user_permissions', user_permissions_schema);