var mongoose = require('mongoose');
var user_permissions_schema = require('../schemas/user_permissions_schema');

module.exports = mongoose.model('UserPermission', user_permissions_schema);