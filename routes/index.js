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

//create new timer
router.post('/add', function (req, res, next) {
    logger.info("req", req);
    var newTimer = new Timer();

    newTimer.timer_description = req.body.newTimerDescription;

    newTimer.timer_interval.hours = req.body.newTimerHours;
    newTimer.timer_interval.minutes = req.body.newTimerMinutes;

    newTimer.timer_total.hours = 0;
    newTimer.timer_total.minutes = 0;

    newTimer.timer_status = "active";

    newTimer.start_date = Date.now(moment().format('YYYY-MM-DD'));

    newTimer.save(function (err) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });

    res.redirect('/');
});

//delete timer
router.delete('/:timer_name', function (req, res, next) {
    logger.info("req", req);

    // addTimer.timer_description = req.body.newTimerDescription;

    // addTimer.save(function (err) {
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
