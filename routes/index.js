var express = require('express');
var logger = require('../config/logger.js');
var moment = require('moment');
var router = express.Router();
var mongoose = require('mongoose');
var Timer = mongoose.model('timer');

// return a list of timers
router.get('/', function (req, res, next) {
    Timer.find(function (err, timers) {
        if (err) return res.status(500).send({error: 'database failure'});
        res.render('index', {result: timers});
    });
});

//create new timer
router.post('/new', function (req, res, next) {
    logger.info("req", req);
    var newTimer = new Timer();

    newTimer.timer_description = req.body.newTimerDescription;

    newTimer.timer_interval.hours = req.body.newTimerHours;
    newTimer.timer_interval.minutes = req.body.newTimerMinutes;

    newTimer.timer_total.hours = 0;
    newTimer.timer_total.minutes = 0;

    newTimer.start_date = Date.now(moment().format('YYYY-MM-DD'));

    newTimer.save(function (err) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});

//delete timer
router.delete('/:timer_name', function (req, res, next) {
    logger.info("req", req);

    // newTimer.timer_description = req.body.newTimerDescription;

    // newTimer.save(function (err) {
    //     if (err) {
    //         logger.error(err);
    //         res.json({result: 0});
    //         return;
    //     }
    //
    //     res.json({result: 1});
    // });
});

module.exports = router;
