var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('./config/logger');

var schedule = require('node-schedule');
var PORT = process.env.PORT || 5000;

// Configuring the database
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    mongoose.connect(dbConfig.url);
} else {
    mongoose.connect(dbConfig.url);
    // mongoose.set('debug', true);
}

mongoose.connect(dbConfig.url);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    logger.info("Connected to mongod server");
});

// DEFINE MODEL
var TimerDb = require('./models/timer');

var Timer = mongoose.model('timer');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT, function() {
    console.log('Listening on ', PORT)
});

// //todo: mongodb에서 get해서 total_timer 업데이트해야 함
// var updateMongoDB = schedule.scheduleJob('*/1 * * * *', function () {
//     logger.info("increase time interval");
//
// });

// https://spion.github.io/posts/why-i-am-switching-to-promises.html
// https://stackoverflow.com/questions/9022099/how-to-use-mongoose-promise-mongo
// https://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html

// var updateData = [];
//
// Timer.find(function (err, timers) {
//     if (err) {
//         logger.error(err);
//         return;
//     }
//
//     timers.forEach(function (data) {
//         updateData.push({
//             _id: data._id,
//             timer_total: {
//                 hours: data.timer_total.hours = data.timer_total.hours + data.timer_interval.hours,
//                 minutes: data.timer_total.minutes = data.timer_total.minutes + data.timer_interval.minutes,
//                 seconds: data.timer_total.seconds
//             }
//         });
//     });
//     console.log("updateData", updateData)
// });

module.exports = app;
