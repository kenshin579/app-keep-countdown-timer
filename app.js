var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('./config/logger');

// Configuring the database
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var isProduction = process.env.NODE_ENV === 'production';

// if (isProduction) {
//     mongoose.connect(dbConfig.url);
// } else {
//     mongoose.connect(dbConfig.url);
//     mongoose.set('debug', true);
// }

mongoose.connect(dbConfig.url);
mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    logger.info("Connected to mongod server");
});

// DEFINE MODEL
var TimerDb = require('./models/timer');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);

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

module.exports = app;
