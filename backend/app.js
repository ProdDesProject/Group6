var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var cors = require('cors');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var robotsRouter = require('./routes/robots');
var reservationsRouter = require('./routes/reservations');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');

const Knex = require('Knex');
const knexConfig = require('./knexFile');
const knex = Knex(knexConfig);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
configurePassport();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/robots', robotsRouter);
app.use('/reservations', reservationsRouter);
app.use('/auth', authController);
app.use('/user', userController);

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
