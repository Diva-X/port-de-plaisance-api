var express = require('express');
var router = express.Router();

// Route GET sur /
router.get('/', function(req, res) {
  res.type('text/plain');
  res.send('Server Express - Bienvenue sur mon application Express');
});

// Route GET sur /about
router.get('/about', function(req, res) {
  res.type('text/plain');
  res.send('Je suis une application Express basique');
});

module.exports = router;