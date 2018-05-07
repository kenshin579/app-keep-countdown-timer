var express = require('express');
var logger = require('../config/logger.js');
var router = express.Router();
var mongoose = require('mongoose');
var Timer = mongoose.model('timer');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//     logger.debug('Debug statement');
//     logger.info('Info statement');
//     logger.warn('Info statement');
//     logger.error('Info statement');
//     res.render('index', {title: 'Express'});
// });

// return a list of tags
router.get('/', function (req, res, next) {
    Timer.find(function (err, timers) {
        if (err) return res.status(500).send({error: 'database failure'});
        res.render('index', {result: timers});
    });
});

module.exports = router;
