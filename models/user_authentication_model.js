var mongoose = require('mongoose');
var user_authentication_schema = require('../schemas/user_authentication_schema');

module.exports = mongoose.model('user_authentication', user_authentication_schema);

/**
 * The user_authentications collection contains credentials and linked information.
 * The credentials contains:
 *     - `username`
 *     - `password` (hash)
 * User information is referenced by ObjectId in `user_id`
 */