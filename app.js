var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const session = require('express-session');

// Connexion MongoDB
require('./db/mongoose');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users'); // supprimé (users est monté dans index)

var app = express();

// Autoriser toutes les requêtes cross-origin
app.use(cors({ origin: '*' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sessions
app.set('trust proxy', 1);
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
  }
}));

// Routes principales
app.use('/', indexRouter);
// app.use('/users', usersRouter); // supprimé

// Middleware 404
app.use(function(req, res, next) {
  res.status(404).json({ error: 'Ressource non trouvée' });
});

// Middleware de gestion des erreurs
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;