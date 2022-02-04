var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash')
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var autoresRouter = require('./routes/autores');
var loginRouter = require('./routes/login');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}))

app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())

let dao = require('./database/dao')

passport.serializeUser( function(autor, done){
  done(null, autor.id)
})

passport.deserializeUser(function(id, done){
  dao.findById(id)
  .then(([rows])=>{
    let autor = rows[0]
    return done(null, autor)
  }).catch(err => {
    return done(err, null)
  })
})

let strategyConfig = {
  nomeField: 'nome',
  passwordField: 'password'
}

passport.use(new LocalStrategy(strategyConfig, function(nome, password, done){
  dao.findByNome(nome)
  .then(([rows])=>{
    if (rows.length == 0) return done(null, false)

    let autor = rows[0]
    if (autor.password != password) return done(null, false)
    else return done(null, autor)
  }).catch( err => {
    console.log(err)
    return done(err, null)
  })
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/autores', autoresRouter);
app.use('/login', loginRouter)

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
