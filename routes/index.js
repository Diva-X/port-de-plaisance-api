const express = require('express');
const router = express.Router();

const reservationsRoute = require('./reservations');
const usersRoute = require('./users'); // si présent

router.get('/', (req, res) => {
  res.render('index', { title: 'Port de Plaisance API' });
});

router.use('/reservations', reservationsRoute);
router.use('/users', usersRoute); // si présent

// Healthcheck pour Render
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;