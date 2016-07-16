var mongoose = require('mongoose');
var UserPermissionSchema = require('../schemas/UserPermissionSchema');

module.exports = mongoose.model('UserPermission', UserPermissionSchema);