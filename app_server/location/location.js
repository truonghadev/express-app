const controller = require('./location.controller');
var express = require('express');
var router = express.Router();

router.get('/', controller.location);
router.get('/review/new', controller.addReview);
router.get('/info', controller.locationInfo);

module.exports = router;
