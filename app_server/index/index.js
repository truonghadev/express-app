const controller = require('./index.controller');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
