const controller = require('./users.controller');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', controller.users);

module.exports = router;
