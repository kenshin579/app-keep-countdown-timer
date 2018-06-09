/*
실행: node populate.js
 */
var mongoose = require('mongoose');
var dbConfig = require('../config/database.config.js');
var logger = require('../config/logger.js');
var JSON_TEST = require('./data.json');

mongoose.connect(dbConfig.url);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    logger.info("Connected to mongod server");
});
var TimerDb = require('../models/timer');
var Timer = mongoose.model('timer');

Timer.count({}, function (err, count) {
    console.log("Number of docs: ", count);

    if (count == 0) {
        Timer.insertMany(JSON_TEST)
            .then(function (mongooseDocuments) {
                if (mongooseDocuments) {
                    console.log("successfully!!");
                }
                db.close();
            })
            .catch(function (err) {
                /* Error handling */
                console.log("err", err);
            });
    }

});