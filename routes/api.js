var router = require('express').Router();
var mongoose = require('mongoose');
var Timer = mongoose.model('timer');
var logger = require('../config/logger');

router.get('/timers', function (req, res, next) {
    Timer.find(function (err, timers) {
        if (err) return res.status(500).send({error: 'database failure'});
        res.json(timers);
    });
});

router.post('/timers', function (req, res, next) {
    logger.info("req", req);
    var newTimer = new Timer();

    newTimer.timer_description = req.body.timer_description;

    newTimer.timer_interval.hours = req.body.timer_interval.hours;
    newTimer.timer_interval.minutes = req.body.timer_interval.minutes;

    newTimer.timer_total.hours = req.body.timer_total.hours;
    newTimer.timer_total.minutes = req.body.timer_total.minutes;

    newTimer.start_date = new Date(req.body.start_date);

    newTimer.save(function (err) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});

module.exports = router;
