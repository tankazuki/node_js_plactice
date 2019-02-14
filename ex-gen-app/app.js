var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let hello = require('./routes/hello');
let session = require('express-session');
let ajax = require('./routes/ajax');
let validator = require('express-validator');
var app = express();

// view engine setup
app.use(validator());
app.use('/ajax', ajax);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let session_opt = {
  secret: 'keyboard on',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60*60*1000}
};

app.use(session(session_opt));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
