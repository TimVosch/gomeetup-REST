var mongoose = require('mongoose');
var UserAuthSchema = require('../schemas/UserAuthSchema');

module.exports = mongoose.model('UserAuth', UserAuthSchema);