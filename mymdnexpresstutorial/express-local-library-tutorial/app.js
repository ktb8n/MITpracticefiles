//import useful node libraries using require() 

var createError = require('http-errors');
var express = require('express');
//path is a core node library for parsing file and directory paths
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//require() modules from our routes directory. These files contain code for handling particular sets of related "routes" (URL paths)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//creates app
var app = express();

// Use the newly created app to set up the view engine
//set the views value to specify the folder where the templates will be stored
app.set('views', path.join(__dirname, 'views'));
//set the view engine  value to specify the template library (in this case "pug")
app.set('view engine', 'pug');


//This set of functions call app.use() to implement the the middleware libraries we imported above into the request handling chain. 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route handling code, also calls app.use() to implement the imported modules 
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

//add the configured app to the module exports:
module.exports = app;
