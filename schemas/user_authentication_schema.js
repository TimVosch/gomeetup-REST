var mongoose = require('mongoose');

module.exports.name = 'user_authentication';
module.exports.collection = 'user_authentication';
module.exports.schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, match: /^[\w]{6,}$/},
  password: {type: String, required: true, match: /^.{6,}$/},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user_information'}
});

/**
 * The user_authentications collection contains credentials and linked information.
 * The credentials contains:
 *     - `username`
 *     - `password` (hash)
 * User information is referenced by ObjectId in `user_id`
 */