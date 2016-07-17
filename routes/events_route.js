var express = require('express');
var router = express.Router();
var api = require('../api/api');

router.get('/', api.events.get_event);
router.get('/:id', api.events.get_event);
router.post('/', api.events.create_event);
router.delete('/:id', api.events.remove_event);

module.exports = router;