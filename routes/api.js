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

router.post('/add', function (req, res, next) {
    logger.info("req", req);
    var newTimer = new Timer();

    newTimer.timer_description = req.body.timer_description;

    newTimer.timer_interval.hours = req.body.timer_interval.hours;
    newTimer.timer_interval.minutes = req.body.timer_interval.minutes;

    newTimer.timer_total.hours = req.body.timer_interval.hours;
    newTimer.timer_total.minutes = req.body.timer_interval.minutes;
    newTimer.timer_total.seconds = 0;

    newTimer.timer_status = req.body.timer_status;

    newTimer.start_date = req.body.start_date;

    newTimer.save(function (err, timer) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1, _id: timer._id});
    });
});


router.post('/modify/:id', function (req, res, next) {
    logger.info("req.params.id", req.params.id);

    var modifyObj = {};
    if (req.body.timer_description != null) {
        modifyObj["timer_description"] = req.body.timer_description;
    }
    if (req.body.timer_interval != null) {
        modifyObj["timer_interval"] = {
            hours: req.body.timer_interval.hours,
            minutes: req.body.timer_interval.minutes
        };
    }
    if (req.body.timer_total != null) {
        modifyObj["timer_total"] = {
            hours: req.body.timer_total.hours,
            minutes: req.body.timer_total.minutes,
            seconds: req.body.timer_total.seconds
        };
    }

    var updateData = {
        $set: modifyObj
    };

    Timer.findByIdAndUpdate(req.params.id, updateData, function (err, timer) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1, _id: timer._id});
    });
});

router.delete('/delete/:id', function (req, res, next) {
    // logger.info("req.params.id", req.params.id);

    Timer.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

router.post('/update/:id', function (req, res, next) {
    // logger.info("req", req);
    logger.info("req.params.id", req.params.id);
    var updateData = {
        "timer_status": req.body.timer_status
    };

    Timer.findByIdAndUpdate(req.params.id, updateData, function (err) {
        if (err) {
            logger.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    });
});

module.exports = router;
