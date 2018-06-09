var express = require('express');
var logger = require('../config/logger.js');
var moment = require('moment');
var router = express.Router();
var mongoose = require('mongoose');
var Timer = mongoose.model('timer');

// return a list of timers
router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
