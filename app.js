var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// Connexion MongoDB
require('./db/mongoose');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users'); // supprimé

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