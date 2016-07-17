var express = require('express');
var router = express.Router();
var api = require('../api/api');

var check_permissions = require('../middleware/check_permissions')('events');

router.get('/', check_permissions('read'), api.events.get_event);
router.get('/:id', check_permissions('read'), api.events.get_event);
router.post('/', check_permissions('create'), api.events.create_event);
router.delete('/:id', check_permissions('remove'), api.events.remove_event);

module.exports = router;