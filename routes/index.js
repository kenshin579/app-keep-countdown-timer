var express = require('express');
var router = express.Router();

// return a list of timers
router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
