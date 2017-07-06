const controller = require('./about.controller');
var express = require('express');
var router = express.Router();

router.get('/', controller.about);

module.exports = router;
