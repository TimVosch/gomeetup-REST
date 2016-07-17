var mongoose = require('mongoose');
var user_information_schema = require('../schemas/user_information_schema');

module.exports = mongoose.model('user_information', user_information_schema, 'user_information');

/**
 * The user_information collections contains general information about a user:
 *     - `permissions`
 * 
 * Permissions are not yet implemented.
 */