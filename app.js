var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash')
var session = require('express-session')

var autoresRouter = require('./routes/autores');
var loginRouter = require('./routes/login');

const passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 2 * 60 *1000},
  resave: false,
  saveUninitialized: false
}))

app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())

let middlewareAutorization = function(req, res, next){
  if (req.isAuthenticated()) return next ()
  else res.redirect('/login')
}

app.use('/autores', middlewareAutorization ,autoresRouter);
app.use('/login', loginRouter)

require('./services/auth')(passport)

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
