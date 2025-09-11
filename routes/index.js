// routes/index.js
var express = require('express');
var router = express.Router();
const userRoute = require('../routes/users');
const reservationsRoute = require('../routes/reservations');
const authRoute = require('./auth');

router.use('/auth', authRoute);
router.get('/', async (req, res) => {
  res.status(200).json({
    name: process.env.APP_NAME || 'API',
    version: '1.0',
    status: 200,
    message: 'Bienvenue sur l\\’API !'
  });
});

router.use('/users', userRoute);
router.use('/reservations', reservationsRoute);

module.exports = router;